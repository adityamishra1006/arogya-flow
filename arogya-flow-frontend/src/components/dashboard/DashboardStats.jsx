export default function DashboardStats({stats}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Total Doctors"
                value={stats?.totalDoctors ?? 0}
            />
            <StatCard
                title="Total Slots"
                value={stats?.totalSlots ?? 0}
            />
            <StatCard
                title="Total Tokens"
                value={stats?.totalTokens ?? 0}
            />
            <StatCard
                title="Active Tokens"
                value={stats?.activeTokens ?? 0}
            />
        </div>
    )
}

function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}