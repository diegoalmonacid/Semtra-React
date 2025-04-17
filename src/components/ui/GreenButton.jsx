export const GreenButton = ({ onClick, children, disabled }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 ${
          disabled ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''
        }`}
      >
        {children}
      </button>
    );
  };
  
  