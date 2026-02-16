import { useEffect, useState } from "react";
import {getDashboardStats, resetDashboard} from "../api/dashboardApi";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const handleReset = async () => {
        try{
            setRefreshing(true);
            await resetDashboard();
            await fetchDashboardStats();
        }catch (err) {
            alert("Failed to reset dashboard");
            console.log(err);
        } finally {
            setRefreshing(false);
        }
    }

    const fetchDashboardStats = async (isRefresh = false) => {
        try {
            isRefresh ? setRefreshing(true) : setLoading(true);

            const response = await getDashboardStats();
            setStats({ ...response.data });
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load dashboard statistics");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader text="Loading dashboard..." />
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">
                    Arogya Flow Dashboard
                </h1>

                <Button
                    onClick={handleReset}
                    disabled={refreshing}
                >
                    {refreshing ? "Resetting..." : "Reset Stats"}
                </Button>

            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

                <StatCard
                    title="Total Doctors"
                    value={stats?.totalDoctors ?? 0}
                />

                <StatCard
                    title="Total Slots"
                    value={stats?.totalSlots ?? 0}
                />

                <StatCard
                    title="Booked Slots"
                    value={stats?.bookedSlots ?? 0}
                />

                <StatCard
                    title="Available Slots"
                    value={stats?.openSlots ?? 0}
                />

                <StatCard
                    title="Upcoming Appointments"
                    value={stats?.upcomingAppointments ?? 0}
                />

            </div>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="
            bg-white/80 backdrop-blur-sm
            rounded-xl shadow-md
            p-5
            transition-all duration-300
            hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
        ">
            <p className="text-sm text-gray-500">
                {title}
            </p>

            <p className="text-3xl font-bold mt-2 text-gray-800">
                {value}
            </p>
        </div>
    );
}
