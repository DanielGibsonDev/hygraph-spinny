export const Button = ({
                           children,
                           className = "",
                           onClick,
                           bgColor = "bg-venture-blue hover:bg-ash-black",
                           textColor = "text-white",
                           focusColor = "focus:ring-ash-black",
                       }) => (
    <button type="button"
            className={`px-3 py-2 border border-transparent shadow-sm font-medium ${textColor} ${bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${focusColor} text-sm ${className}`}
            onClick={onClick}>
        {children}
    </button>
);