const RunButton = ({ onClick, isExecuting }) => {
  return (
    <button
      onClick={onClick}
      disabled={isExecuting}
      className={`px-4 py-2 ml-4 rounded-xl h-[40px] min-w-[105px] flex items-center justify-center gap-2
                transition-all duration-300 text-white font-semibold text-base tracking-wide
                focus:outline-none focus:ring-4 focus:ring-opacity-70 shadow-lg
                ${isExecuting 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed opacity-80'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-400 hover:shadow-xl active:scale-95'
                }`}
    >
      {isExecuting ? (
        <>
          <svg 
            className="animate-spin h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-20" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-80" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="animate-pulse">Executing...</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5 transform transition-transform duration-300 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="relative">
            Run
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-70"></span>
          </span>
        </>
      )}
    </button>
  );
};

export default RunButton;