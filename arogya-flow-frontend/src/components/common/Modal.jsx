import {useEffect} from "react";

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer = null,
    size = "md", // sm | md | lg
}){
    useEffect(() => {
        if(!isOpen) return;

        const handleEsc = (e) => {
            if(e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if(!isOpen) return null;

    const sizeClasses = {
        sm:"max-w-sm",
        md:"max-w-md",
        lg:"max-w-lg",
    };

    return (
        <div className="fixed inset-0 z-50 items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />
                <div className={`relative w-full ${sizeClasses[size]} mx-4 rounded-lg bg-white shadow-lg`}>
                    {title && (
                        <div className="flex items-center justify-between border-b px-4 py-3">
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Close modal"
                            >
                                X
                            </button>
                        </div>
                    )}
                    <div className="px-4 py-4">{children}</div>
                    {footer && (
                        <div className="border-t px-4 py-3 flex justify-end gap-2">
                            {footer}
                        </div>
                    )}
                </div>
        </div>
    );
}