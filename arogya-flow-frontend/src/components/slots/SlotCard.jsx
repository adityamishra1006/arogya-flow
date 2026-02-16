import StatusBadge from "../common/StatusBadge.jsx";

export default function SlotCard({ slot, onBook }) {
    if (!slot) return null;

    const handleBookClick = () => {
        if (onBook) {
            onBook(slot);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 transition hover:shadow-md">
            {/* Slot Time */}
            <h3 className="text-lg font-semibold">
                {slot.startTime} – {slot.endTime}
            </h3>

            {/* Date */}
            <p className="text-sm text-gray-500 mt-1">
                Date: {slot.slotDate}
            </p>

            {/* Patient Name (Only if booked) */}
            {slot.patientName && (
                <p className="text-sm text-gray-600 mt-1">
                    Patient:{" "}
                    <span className="font-medium">
                        {slot.patientName}
                    </span>
                </p>
            )}

            {/* Status Badge */}
            <div className="mt-3">
                <StatusBadge status={slot.status} />
            </div>

            {/* Book Button (Only if OPEN) */}
            {slot.status === "OPEN" && (
                <button
                    onClick={handleBookClick}
                    className="mt-4 w-full bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
                >
                    Book Slot
                </button>
            )}
        </div>
    );
}
