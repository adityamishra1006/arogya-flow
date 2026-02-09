import { useEffect, useState } from "react";
import { getAllDoctors } from "../api/doctorApi";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const response = await getAllDoctors();
        setDoctors(response.data);
        setLoading(false);
    };

    if (loading) {
        return <p className="p-6">Loading Doctors...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Doctors</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="bg-white rounded-lg shadow p-5"
                    >
                        <h2 className="text-lg font-semibold">
                            Dr. {doctor.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {doctor.specialization}
                        </p>

                        <button
                            onClick={() =>
                                navigate(`/doctors/${doctor.id}/slots`)
                            }
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            View Slots
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
