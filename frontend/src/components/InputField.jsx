const InputField = ({ input, setInput }) => {
    return (
      <textarea
        className="w-full h-20 p-2 border rounded bg-gray-900 text-white"
        placeholder="Enter input data..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    );
  };
  
  export default InputField;
  