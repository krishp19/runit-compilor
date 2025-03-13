import { useState } from 'react';

const InputField = ({ input, setInput }) => {
  return (
    <div className="bg-gray-900 text-white h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex-1">
        <div className="p-2 bg-gray-800 text-sm text-gray-400 flex justify-between items-center">
          <span>Input</span>
        </div>
        <div className="h-[calc(100%-2.5rem)] p-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input here..."
            className="w-full h-full bg-gray-800 text-white p-4 rounded-lg font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default InputField; 