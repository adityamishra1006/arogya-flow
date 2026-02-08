export default function Button({
                                   children,
                                   onClick,
                                   type = "button",
                                   variant = "primary",
                                   disabled = false,
                                   loading = false,
                                   className = "",
                               }) {
    const isDisabled = disabled || loading;

    const baseStyles =
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none";

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400",
        danger:
            "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500",
    };

    const disabledStyles = "opacity-50 cursor-not-allowed";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`${baseStyles} ${variants[variant]} ${
                isDisabled ? disabledStyles : ""
            } ${className}`}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
}
