import { useState } from 'react';

const OutputBox = ({ output, input, setInput }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatOutput = (output) => {
    if (!output) return "Waiting for code execution...";
    
    try {
      // Try to parse as JSON for better formatting
      const parsed = JSON.parse(output);
      return JSON.stringify(parsed, null, 2);
    } catch {
      // If not JSON, return as is
      return output;
    }
  };

  const isError = output?.toLowerCase().includes('error');

  return (
    <div className="bg-gray-900 text-white h-[70vh] flex flex-col">
      {/* Input Section */}
      <div className="border-b border-gray-700 flex-1">
        <div className="p-2 bg-gray-800 text-sm text-gray-400 flex justify-between items-center">
          <span>Input (one value per line)</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setInput('')}
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Clear
            </button>
            <span className="text-xs text-gray-500">Example: John[Enter]25</span>
          </div>
        </div>
        <textarea
          className="w-full h-[calc(100%-2.5rem)] p-4 bg-gray-900 text-white font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter each input on a new line...&#10;Example:&#10;John&#10;25"
          spellCheck="false"
        />
      </div>

      {/* Output Section */}
      <div className="flex-1">
        <div className="p-2 bg-gray-800 text-sm text-gray-400 flex justify-between items-center">
          <span>Output</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopy(output)}
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded flex items-center space-x-1"
            >
              <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
            <span className="text-xs text-gray-500">Program execution result</span>
          </div>
        </div>
        <pre 
          className={`w-full h-[calc(100%-2.5rem)] p-4 font-mono overflow-auto whitespace-pre-wrap ${
            isError ? 'bg-red-900/20 text-red-400' : 'bg-gray-900 text-white'
          }`}
        >
          {formatOutput(output)}
        </pre>
      </div>
    </div>
  );
};

export default OutputBox;
