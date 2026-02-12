import Button from "../common/Button";

export default function SlotCard({ slot, onBook }) {
    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-semibold">
                {slot.startTime} - {slot.endTime}
            </h3>

            <p className="text-sm text-gray-500">
                Status: {slot.status}
            </p>

            {slot.status === "OPEN" && (
                <Button
                    className="mt-3"
                    onClick={() => onBook(slot)}
                >
                    Book Slot
                </Button>
            )}

            {slot.status === "BOOKED" && (
                <p className="text-red-600 mt-3 text-sm">
                    Already Booked
                </p>
            )}
        </div>
    );
}
