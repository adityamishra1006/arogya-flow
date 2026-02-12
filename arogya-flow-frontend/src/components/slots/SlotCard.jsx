export default function SlotCard({ slot, onBook }) {

    if (!slot) return null;

    const getStatusText = () => {
        switch (slot.status) {
            case "OPEN":
                return "Available";
            case "BOOKED":
                return "Already Taken";
            case "CLOSED":
                return "Time Expired";
            default:
                return slot.status;
        }
    };

    const getStatusColor = () => {
        switch (slot.status) {
            case "OPEN":
                return "bg-green-100 text-green-700";
            case "BOOKED":
                return "bg-red-100 text-red-700";
            case "CLOSED":
                return "bg-gray-200 text-gray-600";
            default:
                return "bg-gray-100";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold">
                {slot.startTime} – {slot.endTime}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
                Date: {slot.slotDate}
            </p>

            <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${getStatusColor()}`}
            >
                {getStatusText()}
            </span>

            {/* ✅ SHOW BUTTON ONLY IF SLOT IS OPEN */}
            {slot.status === "OPEN" && (
                <button
                    onClick={() => onBook(slot.id)}
                    className="mt-4 w-full bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
                >
                    Book Slot
                </button>
            )}
        </div>
    );
}
