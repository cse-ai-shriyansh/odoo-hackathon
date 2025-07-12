import { useState } from "react";

export default function ProfileCard({ user: initialUser }) {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    location: user.location || "",
    profilePhoto: user.profilePhoto || "",
    experience: user.experience || "",
    projects: user.projects || "",
    availability: user.availability || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setEditing(false);
        setSuccess("Profile updated!");
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-xl shadow flex flex-col md:flex-row items-center gap-6">
      <img
        src={user.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-blue-300 shadow-md object-cover"
      />
      <div className="flex-1">
        {editing ? (
          <form className="space-y-3" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
              <input className="border rounded px-3 py-2" name="email" value={form.email} onChange={handleChange} placeholder="Email" required type="email" />
              <input className="border rounded px-3 py-2" name="location" value={form.location} onChange={handleChange} placeholder="Location" />
              <div className="flex flex-col gap-1">
  <input
    className="border rounded px-3 py-2 mb-1"
    name="profilePhoto"
    value={form.profilePhoto}
    onChange={handleChange}
    placeholder="Profile Photo URL"
    type="url"
  />
  <input
    type="file"
    accept="image/*"
    onChange={e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = ev => {
          setForm(f => ({ ...f, profilePhoto: ev.target.result }));
        };
        reader.readAsDataURL(file);
      }
    }}
  />
  {form.profilePhoto && (
    <img src={form.profilePhoto} alt="Preview" className="w-16 h-16 rounded-full border mt-2 object-cover" />
  )}
</div>
              <input className="border rounded px-3 py-2" name="experience" value={form.experience} onChange={handleChange} placeholder="Experience" />
              <input className="border rounded px-3 py-2" name="projects" value={form.projects} onChange={handleChange} placeholder="Projects" />
              <input className="border rounded px-3 py-2" name="availability" value={form.availability} onChange={handleChange} placeholder="Availability" />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
              <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditing(false)} disabled={saving}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-blue-800 mb-1">{user.name}</h2>
            <div className="text-gray-700 mb-2">{user.email}</div>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
              <div><span className="font-semibold">Location:</span> {user.location || 'N/A'}</div>
              <div><span className="font-semibold">Experience:</span> {user.experience || 'N/A'}</div>
              <div><span className="font-semibold">Projects:</span> {user.projects || 'N/A'}</div>
              <div><span className="font-semibold">Availability:</span> {user.availability || 'N/A'}</div>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition" onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
}

