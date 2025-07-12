import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import SkillSection from "../components/SkillSection";
import SwapRequestList from "../components/SwapRequestList";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [swapRequests, setSwapRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:4000/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data || null));
    fetch("http://localhost:4000/api/skill/offered", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSkillsOffered(data.skills || []));
    fetch("http://localhost:4000/api/skill/wanted", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSkillsWanted(data.skills || []));
    fetch("http://localhost:4000/api/swap", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSwapRequests(data.requests || []));
  }, []);

  if (!user) {
    return <div className="text-center mt-20 text-lg">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileCard user={user} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillSection title="Skills Offered" skills={skillsOffered} color="text-green-700" emptyText="No skills offered yet" />
          <SkillSection title="Skills Wanted" skills={skillsWanted} color="text-purple-700" emptyText="No skills wanted yet" />
        </div>
        <SwapRequestList requests={swapRequests} />
      </div>
    </div>
  );
}
