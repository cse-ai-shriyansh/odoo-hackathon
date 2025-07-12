import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { validateSkillName } from "../utils/validation";
import { apiFetch } from "../utils/api";

export default function Skills() {
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [type, setType] = useState("offered");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Use a constant for API base URL to avoid 'process is not defined' error in browser
  const API_BASE = "http://localhost:4000/api";

  async function fetchSkills() {
    setLoading(true);
    try {
      const allSkillsRes = await apiFetch(`${API_BASE}/skill`, {}, []);
      // Assume user profile includes offered/wanted skills as arrays of { id, name }
      const userRes = await apiFetch(`${API_BASE}/user/me`, {}, { skillsOffered: [], skillsWanted: [] });
      setAllSkills(allSkillsRes);
      setSkillsOffered(userRes.skillsOffered || []);
      setSkillsWanted(userRes.skillsWanted || []);
    } catch (err) {
      setError("Failed to load skills. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line
  }, []);

  async function handleAddSkill(e) {
    e.preventDefault();
    setError("");
    if (!selectedSkillId) {
      setError("Please select a skill to add.");
      return;
    }
    try {
      await apiFetch(`${API_BASE}/skill/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: selectedSkillId })
      });
      // Refresh skills
      fetchSkills();
      setSelectedSkillId("");
    } catch (err) {
      setError(err.message || "Failed to add skill");
    }
  }

  async function handleDeleteSkill(skillId, skillType) {
    try {
      await apiFetch(`${API_BASE}/skill/${skillType}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId })
      });
      fetchSkills();
    } catch (err) {
      setError("Failed to delete skill");
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Your Skills</h2>
      <form onSubmit={handleAddSkill} className="flex gap-2 mb-6">
        <select
          className="border rounded px-2 w-full"
          value={selectedSkillId}
          onChange={e => setSelectedSkillId(e.target.value)}
          required
        >
          <option value="">Select a skill...</option>
          {allSkills.map(skill => (
            <option key={skill.id} value={skill.id}>{skill.name}</option>
          ))}
        </select>
        <select className="border rounded px-2" value={type} onChange={e => setType(e.target.value)}>
          <option value="offered">Offered</option>
          <option value="wanted">Wanted</option>
        </select>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Add</button>
      </form>
      <input
        className="border px-3 py-2 rounded mb-4 w-full"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter skills..."
      />
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-green-700 mb-2">Skills Offered</h3>
           <ul className="space-y-2">
             {[...new Map(skillsOffered.filter(skill => skill.name.toLowerCase().includes(filter.toLowerCase())).map(s => [s.id, s])).values()].map(skill => (
               <li key={skill.id} className="flex justify-between items-center bg-green-50 px-3 py-2 rounded">
                 <span>{skill.name}</span>
                 <button className="text-red-500" onClick={() => handleDeleteSkill(skill.id, "offered")}>Delete</button>
               </li>
             ))}
           </ul>
        </div>
        <div>
          <h3 className="font-semibold text-purple-700 mb-2">Skills Wanted</h3>
           <ul className="space-y-2">
             {[...new Map(skillsWanted.filter(skill => skill.name.toLowerCase().includes(filter.toLowerCase())).map(s => [s.id, s])).values()].map(skill => (
               <li key={skill.id} className="flex justify-between items-center bg-purple-50 px-3 py-2 rounded">
                 <span>{skill.name}</span>
                 <button className="text-red-500" onClick={() => handleDeleteSkill(skill.id, "wanted")}>Delete</button>
               </li>
             ))}
           </ul>
        </div>
        </div>
      )}
    </div>
  );
}
