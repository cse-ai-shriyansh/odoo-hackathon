import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        onLogin && onLogin(data.user);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Left Hero Section */}
      <div className="hidden md:flex flex-col justify-center items-center flex-1 text-white p-12">
        <div className="mb-8">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Skill Swap Logo" className="w-24 h-24 rounded-full shadow-lg border-4 border-white bg-white/20" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Skill Swap</h1>
        <p className="text-lg max-w-md text-white/90 mb-6">Connect. Learn. Grow. Exchange your skills with a vibrant community and unlock new opportunities.</p>
        <div className="flex gap-3">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold shadow">1000+ Skills</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold shadow">Secure & Fast</span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold shadow">Community Driven</span>
        </div>
      </div>
      {/* Right Login Card */}
      <div className="flex flex-1 justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-md bg-white/80 shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/40"
        >
          <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center tracking-tight">Welcome Back</h2>
          {error && <div className="mb-3 text-center text-red-600 font-medium bg-red-50 rounded p-2">{error}</div>}
          <input
            className="block w-full mb-4 px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 text-gray-800 placeholder-gray-400"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            className="block w-full mb-6 px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 text-gray-800 placeholder-gray-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:from-indigo-700 hover:to-pink-600 transition"
            type="submit"
          >
            Log In
          </button>
          <div className="mt-4 text-center text-sm text-gray-500">
            Forgot your password? <span className="text-indigo-600 cursor-pointer hover:underline">Reset</span>
          </div>
        </form>
      </div>
    </div>
  );
}
