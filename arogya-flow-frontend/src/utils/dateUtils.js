export const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export const formatTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

export const formatDateTime = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    return `${formatDate(d)}, ${formatTime(d)}`;
};

export const formatBackendTime = (time) => {
    if (!time) return "-";

    const [hour, minute] = time.split(":");
    const d = new Date();
    d.setHours(hour, minute);

    return formatTime(d);
};

export const isToday = (date) => {
    if (!date) return false;

    const d = new Date(date);
    const today = new Date();

    return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
    );
};
