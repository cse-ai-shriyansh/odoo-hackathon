import { useState, useEffect } from "react";

export default function SwapRequestForm({ onSuccess }) {
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [toUserId, setToUserId] = useState("");
  const [skillOfferedId, setSkillOfferedId] = useState("");
  const [skillWantedId, setSkillWantedId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch all users (except self)
    fetch("http://localhost:4000/api/user/all", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
    // Fetch all skills
    fetch("http://localhost:4000/api/skill", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setSkills(Array.isArray(data) ? data : []));
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!toUserId || !skillOfferedId || !skillWantedId) {
      setError("Please select user and both skills.");
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/api/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ toUserId, skillOfferedId, skillWantedId }),
      });
      if (!res.ok) throw new Error("Failed to send swap request");
      setSuccess("Swap request sent!");
      setToUserId("");
      setSkillOfferedId("");
      setSkillWantedId("");
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.message || "Failed to send swap request");
    }
  }

  return (
    <form className="bg-white rounded-lg shadow p-6 mb-8" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-4 text-indigo-700">Send a Swap Request</h3>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <div className="mb-4">
        <label className="block font-semibold mb-1">To User</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={toUserId}
          onChange={e => setToUserId(e.target.value)}
        >
          <option value="">Select user</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Skill You Offer</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={skillOfferedId}
          onChange={e => setSkillOfferedId(e.target.value)}
        >
          <option value="">Select skill</option>
          {skills.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Skill You Want</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={skillWantedId}
          onChange={e => setSkillWantedId(e.target.value)}
        >
          <option value="">Select skill</option>
          {skills.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition"
        type="submit"
      >
        Send Request
      </button>
    </form>
  );
}
