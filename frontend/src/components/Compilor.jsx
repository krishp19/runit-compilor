"use client";
import { useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import LanguageSelector from "./LanguageSelector";
import InputField from "./InputField";
import OutputBox from "./OutputBox";
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
      setOutput("Executing code...");
      
      // Split input by newlines and filter out empty lines
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
    if (lang === "javascript") {
      return `const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your name: ", function (name) {
  rl.question("Enter your age: ", function (age) {
    console.log(\`Hello \${name}, you are \${age} years old.\`);
    rl.close();
  });
});`;
    } else if (lang === "python") {
      return `name = input("Enter your name: ")
age = input("Enter your age: ")
print(f"Hello {name}, you are {age} years old.")`;
    }
    return "// Write your code here...";
  };

  // Update code when language changes
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(getDefaultCode(newLang));
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
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Code Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <LanguageSelector language={language} setLanguage={handleLanguageChange} />
              <RunButton onClick={executeCode} isExecuting={isExecuting} />
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg">
              <CodeEditor language={language} code={code} setCode={setCode} />
            </div>
          </div>

          {/* Right Panel - Input/Output */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-300">Console</h2>
            <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg">
              <OutputBox 
                output={output}
                input={input}
                setInput={setInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
