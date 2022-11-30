export const Input = ({className = "", value, onChange, onKeyPress}) => (
  <input type="text" value={value}
         className={`bg-ash-black text-white shadow-sm focus:ring-studio-red focus:border-studio-red border-white block w-full sm:text-sm ${className}`}
         onChange={onChange}
         onKeyPress={onKeyPress}/>
)