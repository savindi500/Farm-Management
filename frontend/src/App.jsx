import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Dashboard from './pages/DashBoard';
import Crops from './pages/Crops';
import Fields from './pages/Fields';
import Staff from './pages/Staff';
import Login from './pages/LoginPage';
import SignupPage from './pages/SingupPage'; 
import HomePage from './pages/HomePage';

const App = () => {
  const location = useLocation();

  // Define routes where the sidebar should not appear
  const hideSidebarRoutes = ['/login', '/signup', '/home'];

  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname.toLowerCase()); // Normalize case

  return (
    <div style={{ display: 'flex' }}>
      {!shouldHideSidebar && <Sidebar />}
      <div style={{ margin: '20px', flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} /> {/* Updated path */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/fields" element={<Fields />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/home" element={<HomePage />} /> {/* Updated path */}
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
