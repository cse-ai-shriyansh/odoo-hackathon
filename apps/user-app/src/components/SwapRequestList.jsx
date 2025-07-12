export default function SwapRequestList({ requests }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-bold mb-2 text-orange-700">Swap Requests</h3>
      {requests.length === 0 ? (
        <div className="text-gray-400 italic">No swap requests</div>
      ) : (
        <ul className="divide-y">
          {requests.map((r) => (
            <li key={r.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <span className="font-semibold">From:</span> {r.fromUser?.name || r.fromUserId}
                <span className="ml-4 font-semibold">To:</span> {r.toUser?.name || r.toUserId}
              </div>
              <div>
                <span className="font-semibold">Status:</span> <span className="font-medium capitalize">{r.status}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
