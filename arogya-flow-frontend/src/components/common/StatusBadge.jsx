import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function StatusBadge({ status }) {
    const config = {
        OPEN: {
            label: "Available",
            styles: "bg-green-100 text-green-700 animate-pulse",
            icon: <CheckCircle size={14} />,
        },
        BOOKED: {
            label: "Already Taken",
            styles: "bg-red-100 text-red-700",
            icon: <XCircle size={14} />,
        },
        CLOSED: {
            label: "Expired",
            styles: "bg-gray-200 text-gray-600",
            icon: <Clock size={14} />,
        },
    };

    const { label, styles, icon } =
    config[status] || {
        label: status,
        styles: "bg-gray-100 text-gray-800",
        icon: null,
    };

    return (
        <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${styles}`}
        >
            {icon}
            {label}
        </span>
    );
}
