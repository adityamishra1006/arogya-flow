import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import { createSlotsForDoctor } from "../api/slotApi";
import Button from "../components/common/Button";
import toast from "react-hot-toast";


export default function CreateSlots() {
    const { doctorId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        slotDate: "",
        startTime: "",
        endTime: "",
        slotDurationInMinutes:10
    });

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try{
            await createSlotsForDoctor(doctorId, form);
            toast.success("Slot Booked Successfully.");
            navigate(`/doctors/${doctorId}/slots`);
        }catch (err){
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to create Slot");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Create Slots
            </h1>

            <div className="bg-white rounded-lg shadow p-5 max-w-md space-y-4">
                <input
                    type="date"
                    name="slotDate"
                    className="w-full border rounded p-2"
                    onChange={handleChange}
                />

                <input
                    type="time"
                    name="startTime"
                    className="w-full border rounded p-2"
                    onChange={handleChange}
                />

                <input
                    type="time"
                    name="endTime"
                    className="w-full border rounded p-2"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="slotDurationInMinutes"
                    placeholder="Slot Duration"
                    className="w-full border rounded p-2"
                    value={form.slotDurationInMinutes}
                    onChange={handleChange}
                />

                <Button onClick={handleSubmit}>
                    Create Slots
                </Button>
            </div>
        </div>
    );
}