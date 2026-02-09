import {useEffect, useState} from "react";
import {getAllDoctors} from "../api/doctorApi.js";
import Button from "../components/common/Button.jsx";

export default function Doctors(){
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try{
            setLoading(true);
            const response = await getAllDoctors();
            setDoctors(response.data);
            setError(null);
        } catch(err){
            console.log(err);
            setError("Failed to load doctors. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-medium">Loading Doctors.....</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600 font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Doctors</h1>
                <Button variant="primary">
                    Add Doctor
                </Button>
            </div>

            {doctors.length === 0 ? (
                <p className="text-gray-600">No doctors found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            )}
        </div>
    );
}

function DoctorCard({ doctor }) {
    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-semibold">
                Dr. {doctor.name}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
                {doctor.specialization}
            </p>

            <p className="text-sm text-gray-500 mt-2">
                Max tokens per slot: <strong>{doctor.maxTokensPerSlot}</strong>
            </p>

            <div className="mt-4 flex gap-3">
                <Button variant="secondary">
                    View Slots
                </Button>
            </div>
        </div>
    );
}