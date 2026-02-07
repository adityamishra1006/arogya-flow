import {useEffect, useState} from "react";
import {getAllDoctors} from "../api/doctorApi.js";

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
            setError(err);
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
            <h1 className="text-2xl font-bold mb-6">Doctors</h1>

            {doctors.length == 0 ? (
                <p className="text-gray-600"> No doctors found.</p>
            ) : (
                <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {doctor.name}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
                {doctor.specialization}
            </p>

            <div className="mt-3">
        <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                doctor.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
            }`}
        >
          {doctor.active ? "Active" : "Inactive"}
        </span>
            </div>
        </div>
    );
}
