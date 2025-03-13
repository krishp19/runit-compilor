"use client";
import { useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import Sidebar from "./Sidebar";
import OutputBox from "./OutputBox";
import InputField from "./InputField";
import RunButton from "./RunButton";

const Compiler = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here...");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  const executeCode = async () => {
    try {
      setIsExecuting(true);
      
      // Check if language is supported for execution
      const supportedLanguages = ['javascript', 'python', 'html', 'css', 'java'];
      const isSupported = supportedLanguages.includes(language);
      
      if (!isSupported) {
        setOutput(`The ${language.toUpperCase()} language execution is not yet implemented.\n\nCurrently supported languages:\n- JavaScript\n- Python\n- Java\n- HTML (preview)\n- CSS (preview)`);
        setIsExecuting(false);
        return;
      }
      
      setOutput("Executing code...");
      
      if (language === 'html' || language === 'css') {
        // For HTML and CSS, we'll show the rendered output
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        
        const content = language === 'html' 
          ? code 
          : `<html><head><style>${code}</style></head><body><div class="demo-element">Demo Element</div></body></html>`;
        
        setOutput('');
        setTimeout(() => {
          const outputContainer = document.querySelector('#preview-container');
          if (outputContainer) {
            outputContainer.innerHTML = '';
            outputContainer.appendChild(iframe);
            iframe.contentDocument.open();
            iframe.contentDocument.write(content);
            iframe.contentDocument.close();
          }
        }, 100);
        return;
      }

      // For other languages, proceed with normal execution
      const formattedInput = input
        .split("\n")
        .filter(line => line.trim() !== "")
        .join("\n");

      const response = await axios.post("http://localhost:3001/api/code/execute", {
        language,
        code,
        input: formattedInput,
      });
      
      setOutput(response.data.output || response.data.error);
    } catch (error) {
      setOutput("Error executing code: " + (error.response?.data?.message || error.message));
    } finally {
      setIsExecuting(false);
    }
  };

  // Example code templates
  const getDefaultCode = (lang) => {
    switch (lang) {
      case "javascript":
        return `customReadline.question("Enter your name: ", function(name) {
    customReadline.question("Enter your age: ", function(age) {
        console.log(\`Hello \${name}! You are \${age} years old.\`);
        console.log("Input processing completed.");
    });
});`;

      case "python":
        return `name = input("Enter your name: ")
age = input("Enter your age: ")
print(f"Hello {name}, you are {age} years old.")`;

      case "html":
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My HTML Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
        }
        .description {
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to RunIt!</h1>
        <p class="description">This is a live HTML preview.</p>
    </div>
</body>
</html>`;

      case "css":
        return `.demo-element {
    width: 200px;
    height: 200px;
    margin: 50px auto;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 16px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.demo-element:hover {
    animation: none;
    transform: scale(1.1);
    transition: transform 0.3s ease;
}`;

      case "java":
        return `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

      default:
        return "// Write your code here...";
    }
  };

  // Update code when language changes
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(getDefaultCode(newLang));
    setOutput(''); // Clear output when changing languages
    
    // Clear any existing preview
    const outputContainer = document.querySelector('#preview-container');
    if (outputContainer) {
      outputContainer.innerHTML = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            RunIt Code Compiler
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        <Sidebar selectedLanguage={language} onLanguageSelect={handleLanguageChange} />
        
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel - Code Editor */}
              <div className="space-y-4">
                <div className="flex justify-end">
                  <RunButton onClick={executeCode} isExecuting={isExecuting} />
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                  <CodeEditor language={language} code={code} setCode={setCode} />
                </div>
              </div>

              {/* Right Panel - Input/Output */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">
                  {language === 'html' || language === 'css' ? 'Preview' : 'Console'}
                </h2>
                <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                  {language === 'html' || language === 'css' ? (
                    <div id="preview-container" className="bg-white h-[calc(100vh-12rem)]"></div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <InputField input={input} setInput={setInput} />
                      <OutputBox output={output} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
