import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ProgrammingLanguage {
  PYTHON = 'python',
  JAVASCRIPT = 'javascript',
  JAVA = 'java',
  // Add more languages here as needed
}

export type CodeDocument = Code & Document;

@Schema({ timestamps: true })
export class Code {
  @Prop({ required: true, enum: ProgrammingLanguage })
  language: ProgrammingLanguage;

  @Prop({ required: true })
  code: string;

  @Prop()
  input?: string;

  @Prop()
  output?: string;

  @Prop()
  error?: string;

  @Prop({ default: 0 })
  executionTime?: number;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
