import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell';
import Home from './pages/Home';
import Map from './pages/Map';
import Authority from './pages/Authority';
import Profile from './pages/Profile';
import Report from './pages/Report';
import Login from './pages/Login';
import RegisterCitizen from './pages/RegisterCitizen';
import RegisterAuthority from './pages/RegisterAuthority';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  // Initialize theme on app load
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterCitizen />} />
          <Route path="/register-authority" element={<RegisterAuthority />} />

          <Route path="/" element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="authority" element={
              <ProtectedRoute requiredRole="authority">
                <Authority />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="report" element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            } />
          </Route>
          {/* Map might not need the standard footer, maybe just header so we map it outside AppShell if needed, but for MVP standard AppShell is okay. Let's use custom for Map to maximize screen space as per HTML. */}
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
