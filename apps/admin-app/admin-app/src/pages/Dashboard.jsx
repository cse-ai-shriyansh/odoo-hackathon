export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-extrabold text-blue-700 tracking-tight">SkillSwap Admin</div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold shadow hover:scale-105 transition-transform">Logout</button>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <div className="text-5xl text-blue-500 mb-2">👤</div>
            <div className="text-lg font-semibold text-gray-700">Total Users</div>
            <div className="text-3xl font-bold text-blue-700 mt-2">1,234</div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <div className="text-5xl text-purple-500 mb-2">💡</div>
            <div className="text-lg font-semibold text-gray-700">Skills Listed</div>
            <div className="text-3xl font-bold text-purple-700 mt-2">567</div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <div className="text-5xl text-pink-500 mb-2">🔄</div>
            <div className="text-lg font-semibold text-gray-700">Swaps Completed</div>
            <div className="text-3xl font-bold text-pink-700 mt-2">89</div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/70 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Recent Users</h2>
            <ul className="divide-y divide-blue-100">
              <li className="py-2 flex justify-between"><span>Jane Doe</span><span className="text-sm text-gray-500">jane@email.com</span></li>
              <li className="py-2 flex justify-between"><span>John Smith</span><span className="text-sm text-gray-500">john@email.com</span></li>
              <li className="py-2 flex justify-between"><span>Alice Lee</span><span className="text-sm text-gray-500">alice@email.com</span></li>
            </ul>
          </div>
          <div className="bg-white/70 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Recent Skills</h2>
            <ul className="divide-y divide-purple-100">
              <li className="py-2 flex justify-between"><span>Web Design</span><span className="text-sm text-gray-500">Jane Doe</span></li>
              <li className="py-2 flex justify-between"><span>Photography</span><span className="text-sm text-gray-500">John Smith</span></li>
              <li className="py-2 flex justify-between"><span>Cooking</span><span className="text-sm text-gray-500">Alice Lee</span></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
