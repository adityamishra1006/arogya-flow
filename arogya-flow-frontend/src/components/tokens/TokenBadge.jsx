import { getTokenColorClasses } from "../../utils/tokenColors";

export default function TokenBadge({ status }) {
    const { bg, text } = getTokenColorClasses(status);

    const label = status
        ? status.replace("_", " ")
        : "UNKNOWN";

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
        >
            {label}
        </span>
    );
}
