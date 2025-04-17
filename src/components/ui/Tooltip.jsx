export const Tooltip = ({children, text}) => {
  return (
    <div className="relative group z-50">
      {children}
      {text && (<div className="absolute left-1/2 transform translate-y-8 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-50">
        {text}
      </div>)}
    </div>
  )
}