import Button from "../common/Button.jsx";

export default function SlotCard({slot, onViewTokens, onBookToken}){
    if(!slot) return null;

    return (
        <div className="bg-white rounded-lg shadow p-5 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold">
                    {slot.startTime} - {slot.endTime}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    Doctor: Dr. {slot.doctorName}
                </p>
            </div>

            <div className="flex gap-6 mt-4">
                <SlotStat
                    label="Total Tokens"
                    value={slot.totalTokens}
                />
                <SlotStat
                    label="Available"
                    value={slot.availableTokens}
                />
            </div>

            <div className="flex gap-3 mt-5">
                {onViewTokens && (
                    <Button
                        variant="secondary"
                        onClick={() => onViewTokens(slot)}
                    >
                        View Tokens
                    </Button>
                )}

                {onBookToken && slot.availableTokens > 0 && (
                    <Button
                        onClick={() => onBookToken(slot)}
                    >
                        Book Token
                    </Button>
                )}
            </div>
        </div>
    )
}

function SlotStat({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-lg font-bold">
                {value ?? 0}
            </p>
        </div>
    );
}