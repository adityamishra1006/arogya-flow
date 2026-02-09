import Button from "../common/Button";

export default function SlotCard({ slot }) {
    if (!slot) return null;

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold">
                {slot.startTime} – {slot.endTime}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
                Date: {slot.slotDate}
            </p>

            <div className="mt-4">
                <p className="text-sm">
                    Total patients:{" "}
                    <strong>{slot.totalPatients}</strong>
                </p>

                <p
                    className={`text-sm font-semibold ${
                        slot.remainingPatients > 0
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    Remaining patients: {slot.remainingPatients}
                </p>
            </div>

            {slot.remainingPatients === 0 && (
                <p className="mt-3 text-sm text-red-500 font-medium">
                    Slot Full
                </p>
            )}
        </div>
    );
}
