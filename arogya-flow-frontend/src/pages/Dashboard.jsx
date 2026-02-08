import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";
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

    const fetchDashboardStats = async (isRefresh = false) => {
        try {
            isRefresh ? setRefreshing(true) : setLoading(true);

            const response = await getDashboardStats();
            setStats({...response.data});
            setError(null);
        } catch (err) {
            setError("Failed to load dashboard statistics");
        } finally {
            setLoading(false);
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
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Arogya Flow Dashboard</h1>
                <Button
                    onClick={() => fetchDashboardStats()}
                    disabled={refreshing}
                >
                    {refreshing ? "Refreshing..." : "Refresh Stats"}
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Doctors" value={stats?.totalDoctors ?? 0} />
                <StatCard title="Total Slots" value={stats?.totalSlots ?? 0} />
                <StatCard title="Total Tokens" value={stats?.totalTokens ?? 0} />
                <StatCard title="Active Tokens" value={stats?.activityTokens ?? 0} />
            </div>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}
