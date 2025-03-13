import { Injectable, BadRequestException } from '@nestjs/common';
import { exec } from 'child_process';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Code, CodeDocument } from './code.schema';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import sanitize from 'sanitize-filename';

const execAsync = promisify(exec);

interface ExecutionLimits {
  timeLimit: number;    // in milliseconds
  memoryLimit: number;  // in megabytes
  outputLimit: number;  // in bytes
}

@Injectable()
export class CodeService {
  private readonly tempDir: string;
  private readonly limits: Record<string, ExecutionLimits> = {
    python: {
      timeLimit: 5000,    // 5 seconds
      memoryLimit: 100,   // 100 MB
      outputLimit: 1024 * 1024, // 1 MB
    },
    javascript: {
      timeLimit: 5000,    // 5 seconds
      memoryLimit: 100,   // 100 MB
      outputLimit: 1024 * 1024, // 1 MB
    }
  };

  private readonly bannedImports = [
    'os', 'subprocess', 'sys', 'shutil', 'requests',
    'socket', 'http', 'urllib', 'ftplib', 'telnetlib',
    'smtplib', 'child_process', 'fs', 'path', 'process'
  ];

  constructor(@InjectModel(Code.name) private codeModel: Model<CodeDocument>) {
    this.tempDir = path.resolve(process.cwd(), 'temp');
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
    // Ensure temp directory permissions are restricted
    fs.chmodSync(this.tempDir, '700');
    console.log('Secure temp directory created at:', this.tempDir);
  }

  private sanitizeCode(code: string, language: string): string {
    // Remove potential harmful imports
    const sanitizedCode = this.bannedImports.reduce((acc, imp) => {
      const importRegex = language === 'python'
        ? new RegExp(`(from\\s+${imp}\\s+import|import\\s+${imp})`, 'g')
        : new RegExp(`(require\\s*\\(["']${imp}["']\\)|import\\s+.*\\s+from\\s+["']${imp}["'])`, 'g');
      return acc.replace(importRegex, '// Import removed for security');
    }, code);

    // Add execution time limit wrapper
    if (language === 'python') {
      if (process.platform === 'win32') {
        console.log('Sanitized code:', sanitizedCode);
        return `
import sys

def run_code():
${sanitizedCode.split('\n').map(line => '    ' + line).join('\n')}

try:
    print("Starting execution...")
    run_code()
except Exception as e:
    print(f"Error: {str(e)}", file=sys.stderr)
finally:
    print("Execution finished.")
`;
      } else {
        return `
import signal
import resource
import sys

# Set resource limits
resource.setrlimit(resource.RLIMIT_AS, (${this.limits[language].memoryLimit} * 1024 * 1024, -1))
resource.setrlimit(resource.RLIMIT_CPU, (${this.limits[language].timeLimit / 1000}, -1))

def handle_timeout(signum, frame):
    raise TimeoutError('Execution timed out')

signal.signal(signal.SIGALRM, handle_timeout)
signal.alarm(${Math.ceil(this.limits[language].timeLimit / 1000)})

try:
    ${sanitizedCode}
except Exception as e:
    print(f"Error: {str(e)}", file=sys.stderr)
finally:
    signal.alarm(0)
`;
      }
    } else if (language === 'javascript') {
      return `
const startTime = Date.now();
const maxExecTime = ${this.limits[language].timeLimit};
const interval = setInterval(() => {
  if (Date.now() - startTime > maxExecTime) {
    clearInterval(interval);
    throw new Error('Execution timed out');
  }
}, 100);

// Get input lines from command line argument
const inputLines = (process.argv[2] || '').split('\\n');
let currentInputIndex = 0;

// Create a custom input handler
const customReadline = {
  question: function(prompt, callback) {
    console.log(prompt); // Show the prompt
    const input = inputLines[currentInputIndex] || '';
    currentInputIndex++;
    process.nextTick(() => callback(input));
  }
};

try {
  ${sanitizedCode}
} catch (error) {
  console.error('Error:', error.message);
} finally {
  clearInterval(interval);
}`;
    }
    return sanitizedCode;
  }

  private validateInput(input: string): string {
    // Remove any control characters except newline
    return input.replace(/[\x00-\x09\x0B-\x1F\x7F-\x9F]/g, '');
  }

  private async createSecureFile(content: string, prefix: string, ext: string): Promise<string> {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = sanitize(`${prefix}_${timestamp}_${randomString}.${ext}`);
    const filePath = path.resolve(this.tempDir, fileName);
    
    await fs.promises.writeFile(filePath, content, { mode: 0o600 }); // Read/write for owner only
    return filePath;
  }

  async executeCode(language: string, code: string, input?: string) {
    console.log('Executing code with language:', language);
    console.log('Input provided:', input);

    const fileExtension = { python: 'py', javascript: 'js' }[language];
    if (!fileExtension) {
      throw new BadRequestException(`Unsupported language: ${language}`);
    }

    if (!this.limits[language]) {
      throw new BadRequestException(`Execution limits not configured for language: ${language}`);
    }

    let filePath: string | undefined;
    let inputPath: string | undefined;

    try {
      // Sanitize and secure the code
      const sanitizedCode = this.sanitizeCode(code, language);
      console.log('Creating secure code file...');
      filePath = await this.createSecureFile(sanitizedCode, 'code', fileExtension);
      console.log('Secure code file created at:', filePath);

      // Handle input securely
      if (input) {
        console.log('Creating secure input file...');
        const sanitizedInput = this.validateInput(input);
        inputPath = await this.createSecureFile(sanitizedInput, 'input', 'txt');
        console.log('Secure input file created at:', inputPath);
      }

      const startTime = Date.now();
      const command = language === 'python' ? 'python' : 'node';

      // For JavaScript, pass input as command line argument
      const execCommand = language === 'javascript'
        ? `${command} "${filePath}" "${input || ''}" 2>&1`
        : input && inputPath
          ? `${command} "${filePath}" < "${inputPath}" 2>&1`
          : `${command} "${filePath}" 2>&1`;

      console.log('Executing command:', execCommand);

      const execOptions = {
        timeout: this.limits[language].timeLimit,
        maxBuffer: this.limits[language].outputLimit,
      };

      try {
        const { stdout, stderr } = await execAsync(execCommand, execOptions);
        const executionTime = (Date.now() - startTime) / 1000;

        if (stdout && stdout.length > this.limits[language].outputLimit) {
          throw new Error('Output size limit exceeded');
        }

        const executionResult = {
          language,
          code,
          input: input || null,
          output: stdout || null,
          error: stderr || null,
          executionTime,
        };

        await this.codeModel.create(executionResult);
        return executionResult;
      } catch (execError) {
        console.error('Execution error:', execError);
        return {
          language,
          code,
          input: input || null,
          output: null,
          error: execError.message,
          executionTime: (Date.now() - startTime) / 1000,
        };
      }
    } catch (error) {
      console.error('Service error:', error);
      throw new BadRequestException(error.message);
    } finally {
      // Clean up files securely
      try {
        if (filePath && fs.existsSync(filePath)) {
          console.log('Deleting secure code file:', filePath);
          await fs.promises.unlink(filePath);
        }
        if (inputPath && fs.existsSync(inputPath)) {
          console.log('Deleting secure input file:', inputPath);
          await fs.promises.unlink(inputPath);
        }
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
    }
  }
}
