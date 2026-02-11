// FILE: src/pages/Doctors.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "../api/doctorApi";
import Button from "../components/common/Button";

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        const res = await getAllDoctors();
        setDoctors(res.data);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Doctors</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doc => (
                    <div key={doc.id} className="bg-white rounded-lg shadow p-5">
                        <h2 className="text-lg font-semibold">
                            Dr. {doc.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {doc.specialization}
                        </p>

                        <div className="mt-4">
                            <Button
                                onClick={() =>
                                    navigate(`/doctors/${doc.id}/slots`)
                                }
                            >
                                View Slots
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
