import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, setCode }) => {
  return (
    <div className="border border-gray-700 rounded-md overflow-hidden h-[70vh]">
      <Editor
        height="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(newCode) => setCode(newCode)}
        options={{ 
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
};

export default CodeEditor;
