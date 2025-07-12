import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Swaps from "./pages/Swaps";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import UserSidebar from "./components/UserSidebar";

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  function handleLogin() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex min-h-screen">
          <UserSidebar />
          <div className="flex-1 ml-64">
            <div className="flex justify-end p-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/swaps" element={<Swaps />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div>
          {showSignup ? (
            <>
              <Signup />
              <div className="text-center mt-4">
                <span>Already have an account? </span>
                <button className="text-blue-600 underline" onClick={() => setShowSignup(false)}>
                  Log in
                </button>
              </div>
            </>
          ) : (
            <>
              <Login onLogin={handleLogin} />
              <div className="text-center mt-4">
                <span>Don&apos;t have an account? </span>
                <button className="text-green-600 underline" onClick={() => setShowSignup(true)}>
                  Sign up
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Router>
  );
}

export default App;
