import {useEffect, useState} from "react";
import {getDashboardStats} from "../api/dashboardApi.js";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const response = await getDashboardStats();
            setStats(response.data);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to load dashboard Stats")
        } finally{
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-medium">Loading dashboard...</p>
            </div>
        );
    }

    if(error){
        return (
            <div classname="min-h-screen flex items-center justify-center">
                <p className="text-red-600 font-medium">{error}</p>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Arogya Flow Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title = "Total Doctoes" value={stats.totalDoctors}/>
                <StatCard title="Total Slots" value={stats.totalSlots} />
                <StatCard title="Total Tokens" value={stats.totalTokens} />
                <StatCard title="Active Tokens" value={stats.activityTokens} />
            </div>
        </div>
    )
}

function StatCard({title,value}){
    return(
        <div className="bg-white rounded shadow p-5">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}