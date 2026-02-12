import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSlotsByDoctorAndDate } from "../api/slotApi";
import { getDoctorsById } from "../api/doctorApi";
import { bookSlot } from "../api/appointmentApi";
import SlotCard from "../components/slots/SlotCard";
import BookSlotModal from "../components/slots/BookSlotModal";

export default function Slots() {
    const { doctorId } = useParams();

    const [doctor, setDoctor] = useState(null);
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        fetchDoctor();
        fetchSlots();
    }, [doctorId]);

    const fetchDoctor = async () => {
        const res = await getDoctorsById(doctorId);
        setDoctor(res.data);
    };

    const fetchSlots = async () => {
        const res = await getSlotsByDoctorAndDate(doctorId, today);
        setSlots(res.data);
    };

    const handleBooking = async (data) => {
        await bookSlot(data);
        setSelectedSlot(null);
        fetchSlots();
    };

    if (!doctor) return null;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Dr. {doctor.name}
            </h1>

            <div className="grid grid-cols-3 gap-4">
                {slots.map((slot) => (
                    <SlotCard
                        key={slot.id}
                        slot={slot}
                        onBook={setSelectedSlot}
                    />
                ))}
            </div>

            {selectedSlot && (
                <BookSlotModal
                    isOpen={true}
                    slot={selectedSlot}
                    onClose={() => setSelectedSlot(null)}
                    onSubmit={handleBooking}
                />
            )}
        </div>
    );
}
