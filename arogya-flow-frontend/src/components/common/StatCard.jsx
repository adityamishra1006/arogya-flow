import CountUp from "react-countup";

export default function StatCard({ title, value }) {

    const getColor = () => {
        if (title.includes("Booked")) return "text-red-600";
        if (title.includes("Available")) return "text-green-600";
        if (title.includes("Next")) return "text-indigo-600";
        return "text-gray-800";
    };

    const isValidNumber =
        typeof value === "number" && !isNaN(value);

    const safeValue = isValidNumber ? value : 0;

    return (
        <div className="
            bg-white rounded-xl shadow-md p-5
            transition-all duration-300
            hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
        ">
            <p className="text-sm text-gray-500">
                {title}
            </p>

            <p className={`text-3xl font-bold mt-2 ${getColor()}`}>

                {isValidNumber ? (
                    <CountUp
                        key={safeValue}
                        start={0}
                        end={safeValue}
                        duration={safeValue > 50 ? 2 : 1}
                    />
                ) : (
                    <span className="text-lg font-semibold">
                        {value ?? "-"}
                    </span>
                )}

            </p>
        </div>
    );
}
