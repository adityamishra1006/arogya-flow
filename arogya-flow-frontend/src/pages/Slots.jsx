import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSlotsByDoctorAndDate } from "../api/slotApi";
import SlotCard from "../components/slots/SlotCard";
import Loader from "../components/common/Loader";

export default function Slots() {
    const { doctorId } = useParams();

    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 👇 today’s date in backend format
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        fetchSlots();
    }, [doctorId]);

    const fetchSlots = async () => {
        try {
            setLoading(true);
            const response = await getSlotsByDoctorAndDate(doctorId, today);
            setSlots(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load slots");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader text="Loading slots..." />;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">
                Slots for Doctor ID: {doctorId}
            </h1>

            {slots.length === 0 ? (
                <p className="text-gray-600">No slots available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {slots.map((slot) => (
                        <SlotCard
                            key={slot.id}
                            slot={{
                                ...slot,
                                doctorName: doctorId,
                                totalTokens: null,
                                availableTokens: null,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
