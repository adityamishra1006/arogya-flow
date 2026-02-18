import {useEffect, useState} from "react";
import Button from "../components/common/Button.jsx";
import StatCard from "../components/common/StatCard.jsx";
import {getDashboardStats, resetDashboard} from "../api/dashboardApi.js";

export default function Dashboard() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await getDashboardStats();
            setStats(res.data);
        } catch (err) {
            console.error("Dashboard load failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        try {
            setRefreshing(true);
            await resetDashboard();
            await fetchStats();
        } catch (err) {
            console.error("Reset failed", err);
        } finally {
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">Loading dashboard...</div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Arogya Flow Dashboard
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Today: <span className="font-medium">{stats?.todayDate}</span>
                    </p>
                </div>

                <Button onClick={handleReset} disabled={refreshing}>
                    {refreshing ? "Resetting..." : "Reset Stats"}
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">

                <StatCard title="Total Doctors" value={stats?.totalDoctors ?? 0} />
                <StatCard title="Total Slots" value={stats?.totalSlots ?? 0} />
                <StatCard title="Booked Slots" value={stats?.bookedSlots ?? 0} />
                <StatCard title="Available Slots" value={stats?.openSlots ?? 0} />

                <StatCard title="Today's Bookings" value={stats?.todaysBookings ?? 0} />

                <StatCard
                    title="Next Available Slot"
                    value={stats?.nextAvailableSlot ?? "No slots"}
                />

            </div>
        </div>
    );
}
