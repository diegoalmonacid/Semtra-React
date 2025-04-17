

// eslint-disable-next-line react/prop-types
export const OutlookButton = ({className = "", onClick}) => {
  return (
    <button onClick={onClick} className={`bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded flex items-center ${className}}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M4.79 2.16A2.84 2.84 0 0 0 2 5v14a2.84 2.84 0 0 0 2.8 2.84H16a2.84 2.84 0 0 0 2.83-2.84v-2.77l2.73 1.59A1.41 1.41 0 0 0 24 16.42V7.58a1.41 1.41 0 0 0-2.43-1l-2.73 1.58V5A2.84 2.84 0 0 0 16 2.16ZM5.5 5.26H14a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75H5.5a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75ZM17.8 9.68l3.56-2.07v8.78l-3.56-2.06Z" />
      </svg>
      Inicie sesión por Outlook
    </button>
  );
};
