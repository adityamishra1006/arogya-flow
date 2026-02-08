import Button from "../common/Button.jsx";

export default function QueueView({queue = [], onRefresh}) {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="text-lg font-semibold">Active Queue</h2>
                {onRefresh && (
                    <Button variant="secondary" onClick={onRefresh}>
                        Refresh
                    </Button>
                )}
            </div>

            <div className="p-5">
                {queue.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                        No active token in queue.
                    </p>
                ): (
                    <ul className="space-y-3">
                        {queue.map((item, index) => (
                            <QueueItem key = {item.tokenId || index} item={item} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function QueueItem({ item }) {
    return (
        <div className="flex items-center justify-between borer rounded-md p-3">
            <div>
                <p className="font-medium">
                    Token #{item.tokenNumber}
                </p>
                <p className="text-sm text-gray-500">
                    Patient: {item.patientName}
                </p>
            </div>

            <span className="text-sm font-semibold  text-blue-600">
                {item.status}
            </span>
        </div>
    );
}