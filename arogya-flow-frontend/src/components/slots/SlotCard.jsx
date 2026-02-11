// FILE: src/components/slots/SlotCard.jsx

import Button from "../common/Button.jsx";

export default function SlotCard({ slot, onBook }) {
    if (!slot) return null;

    return (
        <div className="bg-white rounded-lg shadow p-5 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold">
                    {slot.startTime} - {slot.endTime}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    Date: {slot.slotDate}
                </p>
            </div>

            <div className="mt-4">
                {slot.isBooked ? (
                    // FIX: booked state
                    <span className="text-green-600 font-semibold">
                        Booked
                    </span>
                ) : (
                    <Button onClick={() => onBook(slot)}>
                        Book Slot
                    </Button>
                )}
            </div>
        </div>
    );
}
