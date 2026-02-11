import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDoctorsById} from "../api/doctorApi.js";
import {getSlotsByDoctorAndDate} from "../api/slotApi.js";
import {bookToken} from "../api/tokenApi.js";
import SlotCard from "../components/slots/SlotCard.jsx";


export default function Slots(){
    const { doctorId } = useParams();

    const [doctor, setDoctor] = useState(null);
    const [slots, setSlots] = useState([]);
    const [patientsToday, setPatientsToday] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData()
    }, [doctorId]);

    const loadData = async () => {
        try{
            setLoading(true);

            const doctorRes = await getDoctorsById(doctorId);
            setDoctor(doctorRes.data);

            const today = new Date().toISOString().split("T")[0];
            const slotRes = await getSlotsByDoctorAndDate(doctorId, today);
            const slotWithState = slotRes.data.map( slot => ({
                ...slot,
                isBooked: false,
            }));
            setSlots(slotWithState);
        } catch (err){
            console.error("Failed to load slots ",  err);
        }finally {
            setLoading(false);
        }
    };

    const handleBookSlot = async (slot) => {
        try{
            await bookToken({
                doctorId: doctorId,
                slotId: slot.id,
                source:"ONLINE",
            });

            setSlots(prev =>
                prev.map(s =>
                    s.id === slot.id ? {...s, isBooked: true} : s
                )
            );

            setPatientsToday(prev =>prev+1);
        }catch (err){
            console.error("Failed to book slots", err);
        }
    };

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading slots...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* FIX: doctor name instead of ID */}
            <h1 className="text-2xl font-bold mb-1">
                Slots for Dr. {doctor?.name}
            </h1>

            {/* FIX: patient count near doctor name */}
            <p className="text-sm text-gray-600 mb-6">
                Patients Today: {patientsToday}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {slots.map(slot => (
                    <SlotCard
                        key={slot.id}
                        slot={slot}
                        onBook={handleBookSlot}
                    />
                ))}
            </div>
        </div>
    );
}