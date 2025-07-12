import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      if (email === 'admin@example.com' && password === 'admin') {
        // TODO: redirect to dashboard
      } else {
        setError('Invalid credentials');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500">
      <div className="backdrop-blur-xl bg-white/30 shadow-2xl rounded-3xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-lg">Admin Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 shadow"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-white focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-900 shadow"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-200 bg-red-500/50 rounded py-1 px-2 text-center text-xs font-medium">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
