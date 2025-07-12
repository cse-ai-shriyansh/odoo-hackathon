import { useEffect, useState } from "react";
import UserRating from "../components/UserRating";

export default function Explore() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4000/api/user/all", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Explore Users & Skills</h2>
      <ul className="space-y-4">
        {users.length === 0 && <li className="text-gray-500 italic">No users found.</li>}
        {users.map(user => (
          <li key={user.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex items-center gap-4">
              <img src={user.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} alt="avatar" className="w-12 h-12 rounded-full border" />
              <div>
                <div className="font-bold text-blue-800">{user.name}</div>
                <div className="text-gray-600 text-sm">{user.skills?.map(s => s.name).join(", ")}</div>
                <UserRating userId={user.id} />
              </div>
            </div>
            <div className="text-sm text-gray-500">{user.location || "N/A"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
