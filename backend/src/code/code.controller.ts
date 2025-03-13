import { Controller, Post, Body } from '@nestjs/common';
import { CodeService } from './code.service';
import { ProgrammingLanguage } from './code.schema';

class ExecuteCodeDto {
  language: ProgrammingLanguage;
  code: string;
  input?: string;
}

@Controller('api/code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post('execute')
  async execute(@Body() body: ExecuteCodeDto) {
    const { language, code, input } = body;
    return this.codeService.executeCode(language, code, input);
  }
}
