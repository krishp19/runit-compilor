const Sidebar = ({ selectedLanguage, onLanguageSelect }) => {
  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '⚡', supported: true },
    { id: 'python', name: 'Python', icon: '🐍', supported: true },
    { id: 'html', name: 'HTML', icon: '🌐', supported: true },
    { id: 'css', name: 'CSS', icon: '🎨', supported: true },
    { id: 'java', name: 'Java', icon: '☕', supported: true },
    { id: 'cpp', name: 'C++', icon: '⚙️', supported: false },
    { id: 'ruby', name: 'Ruby', icon: '��', supported: false },
    { id: 'go', name: 'Go', icon: '🐹', supported: false },
    { id: 'php', name: 'PHP', icon: '🐘', supported: false },
    { id: 'swift', name: 'Swift', icon: '🦅', supported: false },
    { id: 'kotlin', name: 'Kotlin', icon: '☕', supported: false }
  ];

  return (
    <div className="w-20 bg-gray-900 border-r border-gray-700 flex flex-col items-center py-4 h-[calc(100vh-88px)]">
      <div 
        className="space-y-4 h-full overflow-y-auto pr-2 fancy-scrollbar"
      >
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onLanguageSelect(lang.id)}
            className={`w-16 p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-300 relative ${
              selectedLanguage === lang.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white hover:shadow-md'
            }`}
            title={`${lang.name}${!lang.supported ? ' (Coming Soon)' : ''}`}
          >
            <span className={`text-2xl mb-1 transition-all duration-300 ${selectedLanguage === lang.id ? 'animate-pulse-subtle' : 'group-hover:scale-110'}`}>
              {lang.icon}
            </span>
            <span className="text-xs font-medium">{lang.name}</span>
            
            {!lang.supported && (
              <span className="absolute -top-1 -right-1 text-[8px] px-1 py-0.5 bg-amber-500 text-black rounded-full font-bold">
                SOON
              </span>
            )}
          </button>
        ))}
      </div>
      <style jsx global>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
        
        .fancy-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .fancy-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.2);
          border-radius: 10px;
          margin: 8px 0;
        }
        
        .fancy-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 12px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        
        .fancy-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
        }
        
        /* Firefox */
        .fancy-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4f46e5 rgba(30, 41, 59, 0.2);
        }
        
        /* Hide scrollbar when not hovering, but keep functionality */
        .fancy-scrollbar::-webkit-scrollbar-thumb {
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        
        .fancy-scrollbar:hover::-webkit-scrollbar-thumb {
          opacity: 1;
        }
        
        /* Edge */
        @supports (-ms-overflow-style: none) {
          .fancy-scrollbar {
            overflow: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar; 