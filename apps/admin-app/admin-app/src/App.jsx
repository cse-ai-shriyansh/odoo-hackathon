import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminLogin from './pages/Login';
import AdminDashboard from './pages/Dashboard';
import UsersPage from './pages/Users';
import SkillsPage from './pages/Skills';
import SwapsPage from './pages/Swaps';
import AdminProfile from './pages/Profile';
import AdminSidebar from './components/AdminSidebar';

function AppLayout({ children }) {
  const location = useLocation();
  const showSidebar = location.pathname !== '/login';
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      {showSidebar && <AdminSidebar />}
      <main className={showSidebar ? 'ml-64 flex-1' : 'flex-1'}>{children}</main>
    </div>
  );
}

function App() {
  // TODO: Add real authentication logic
  const isLoggedIn = true; // Set to true for demo; implement real auth later
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/users" element={isLoggedIn ? <UsersPage /> : <Navigate to="/login" />} />
          <Route path="/skills" element={isLoggedIn ? <SkillsPage /> : <Navigate to="/login" />} />
          <Route path="/swaps" element={isLoggedIn ? <SwapsPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <AdminProfile /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
