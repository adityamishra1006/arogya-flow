export const TOKEN_STATUS_COLORS = {
    WAITING: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
    },
    IN_PROGRESS: {
        bg: "bg-blue-100",
        text: "text-blue-800",
    },
    COMPLETED: {
        bg: "bg-green-100",
        text: "text-green-800",
    },
    CANCELLED: {
        bg: "bg-red-100",
        text: "text-red-800",
    },
};

export const getTokenColorClasses = (status) => {
    const color = TOKEN_STATUS_COLORS[status];

    if (!color) {
        return {
            bg: "bg-gray-100",
            text: "text-gray-800",
        };
    }

    return color;
};
