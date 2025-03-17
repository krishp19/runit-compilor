import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, setCode, fontSize }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorDidMount = () => {
    setIsEditorReady(true);
  };

  const handleEditorValidation = (markers) => {
    // Handle validation markers
    markers.forEach((marker) => {
      console.log('Validation:', marker.message);
    });
  };

  return (
    <div className="border border-gray-700 rounded-md overflow-hidden h-[70vh] relative">
      {!isEditorReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      <Editor
        height="calc(100vh - 16rem)"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={setCode}
        onMount={handleEditorDidMount}
        onValidate={handleEditorValidation}
        options={{
          fontSize: fontSize,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          automaticLayout: true,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
          renderWhitespace: "selection",
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          foldingHighlight: true,
          foldingStrategy: 'auto',
          showFoldingControls: 'always',
          matchBrackets: "always",
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoIndent: "full",
          cursorBlinking: "smooth",
          smoothScrolling: true
        }}
      />
    </div>
  );
};

export default CodeEditor;
