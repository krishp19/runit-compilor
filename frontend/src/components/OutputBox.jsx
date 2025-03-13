import { useState } from 'react';

const OutputBox = ({ output }) => {
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

  const isError = output?.toLowerCase().includes('error');

  return (
    <div className="bg-gray-900 text-white h-[calc(50vh-6rem)] flex flex-col">
      <div className="flex flex-col h-full">
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
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 font-mono whitespace-pre-wrap bg-gray-900 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-500">
          {output || 'No output yet...'}
        </div>
      </div>
    </div>
  );
};

export default OutputBox;
