import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: "🏠" },
  { path: "/skills", label: "Skills", icon: "💡" },
  { path: "/swaps", label: "Swaps", icon: "🔄" },
  { path: "/profile", label: "Profile", icon: "👤" },
  // { path: "/explore", label: "Explore", icon: "🔍" }, // Optionally add Explore page
];

export default function UserSidebar() {
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-indigo-800 via-purple-800 to-pink-700 text-white flex flex-col shadow-2xl fixed top-0 left-0 z-40">
      <div className="text-2xl font-extrabold tracking-wide px-8 py-6 mb-4 border-b border-white/10">SkillSwap</div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-xl font-semibold transition-all duration-150 hover:bg-white/10 ${isActive ? "bg-white/20" : ""}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-white/10 text-xs text-white/70">&copy; {new Date().getFullYear()} SkillSwap</div>
    </aside>
  );
}
