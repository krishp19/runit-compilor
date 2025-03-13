const LanguageSelector = ({ language, setLanguage }) => {
    return (
      <select
        className="border px-4 py-2 rounded bg-gray-800 text-white"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
    );
  };
  
  export default LanguageSelector;
  