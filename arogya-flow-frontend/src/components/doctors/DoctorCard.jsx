import Button from "../common/Button.jsx";

export default function DoctorCard({doctor, onViewSlots, onViewQueue}){
    if(!doctor) return null;

    return (
        <div className="bg-white rounded-lg shadow p-5 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold">
                    Dr. {doctor.name}
                </h3>
                <p className="text-sm text-gray-500">
                    {doctor.specialization}
                </p>
            </div>

            <div className="flex gap-6 mt-4">
                <DoctorStat
                    label="Slots"
                    value={doctor.totalSlots}
                />
                <DoctorStat
                    label="Active Slots"
                    value={doctor.activeTokens}
                />
            </div>
            <div className="flex gap-3 mt-5">
                {onViewSlots && (
                    <Button
                        variant="secondary"
                        onClick={() => onViewSlots(doctor)}
                    >
                        View Slots
                    </Button>
                )}

                {onViewQueue && (
                    <Button
                        onClick={() => onViewQueue(doctor)}
                    >
                        View Queue
                    </Button>
                )}
            </div>
        </div>
    )
}

function DoctorStat({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-lg font-bold">
                {value ?? 0}
            </p>
        </div>
    );
}