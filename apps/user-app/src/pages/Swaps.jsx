import { useEffect, useState } from "react";
import SwapRequestForm from "../components/SwapRequestForm";

export default function Swaps() {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const token = localStorage.getItem("token");

  function refreshSwaps() {
    fetch("http://localhost:4000/api/swap/sent", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setSent(Array.isArray(data) ? data : []));
    fetch("http://localhost:4000/api/swap/received", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setReceived(Array.isArray(data) ? data : []));
  }

  useEffect(() => {
    refreshSwaps();
  }, [token]);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <SwapRequestForm onSuccess={refreshSwaps} />
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Swap Requests</h2>
      <div className="mb-8">
        <h3 className="font-semibold text-green-700 mb-2">Sent Requests</h3>
        <ul className="space-y-4">
          {sent.length === 0 && <li className="text-gray-500 italic">No sent requests.</li>}
          {sent.map(req => (
            <li key={req.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <span className="font-semibold">To:</span> {req.toUserId}
              </div>
              <div>
                <span className="font-semibold">Status:</span> <span className="font-medium capitalize">{req.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-purple-700 mb-2">Received Requests</h3>
        <ul className="space-y-4">
          {received.length === 0 && <li className="text-gray-500 italic">No received requests.</li>}
          {received.map(req => (
            <li key={req.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <span className="font-semibold">From:</span> {req.fromUserId}
              </div>
              <div>
                <span className="font-semibold">Status:</span> <span className="font-medium capitalize">{req.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
