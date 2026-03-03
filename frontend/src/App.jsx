import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Home from './pages/Home';
import Map from './pages/Map';
import Authority from './pages/Authority';
import Profile from './pages/Profile';
import Report from './pages/Report';
import { useEffect } from 'react';

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
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="authority" element={<Authority />} />
          <Route path="profile" element={<Profile />} />
          <Route path="report" element={<Report />} />
        </Route>
        {/* Map might not need the standard footer, maybe just header so we map it outside AppShell if needed, but for MVP standard AppShell is okay. Let's use custom for Map to maximize screen space as per HTML. */}
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
