const OutputBox = ({ output, input, setInput }) => {
  return (
    <div className="bg-gray-900 text-white h-[70vh] flex flex-col">
      {/* Input Section */}
      <div className="border-b border-gray-700 flex-1">
        <div className="p-2 bg-gray-800 text-sm text-gray-400 flex justify-between items-center">
          <span>Input (one value per line)</span>
          <span className="text-xs text-gray-500">Example: John[Enter]25</span>
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
          <span className="text-xs text-gray-500">Program execution result</span>
        </div>
        <pre className="w-full h-[calc(100%-2.5rem)] p-4 bg-gray-900 text-white font-mono overflow-auto whitespace-pre-wrap">
          {output || "Waiting for code execution..."}
        </pre>
      </div>
    </div>
  );
};

export default OutputBox;
