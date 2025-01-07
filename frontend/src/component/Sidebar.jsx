import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user session or token from localStorage
    localStorage.removeItem('authToken');
    
    // Redirect to the login page or home page after logout
    navigate('/login');  // Change '/login' to your actual login route
  };

  return (
    <div className="sidebar bg-green-50 text-green-800 h-screen w-64 flex flex-col p-5 shadow-lg rounded-lg">
      <div className="logo text-center mb-6">
        <h1 className="text-2xl font-semibold text-green-900">🌱 Agrimo</h1>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="flex items-center p-3 hover:bg-green-200 rounded-md transition duration-300 ease-in-out">
          <span className="mr-3 text-xl">📊</span>
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link to="/crops" className="flex items-center p-3 hover:bg-green-200 rounded-md transition duration-300 ease-in-out">
          <span className="mr-3 text-xl">🌾</span>
          <span className="font-medium">Crops</span>
        </Link>
        <Link to="/fields" className="flex items-center p-3 hover:bg-green-200 rounded-md transition duration-300 ease-in-out">
          <span className="mr-3 text-xl">🌍</span>
          <span className="font-medium">Fields</span>
        </Link>
        <Link to="/staff" className="flex items-center p-3 hover:bg-green-200 rounded-md transition duration-300 ease-in-out">
          <span className="mr-3 text-xl">👥</span>
          <span className="font-medium">Staff</span>
        </Link>
      </nav>
      <div className="mt-auto">
        <button onClick={handleLogout} className="flex items-center p-3 hover:bg-red-200 text-red-600 rounded-md transition duration-300 ease-in-out">
          
          <span className="font-medium">Logout</span>
        </button>
      </div>
      <div className="good-day mt-6 bg-green-100 p-4 rounded-md">
        <img src="https://i.pinimg.com/736x/7a/5a/dc/7a5adc3c4624304053f682fefc8610f5.jpg" alt="Good Day" className="rounded-md mb-2" />
        <p className="text-center text-sm font-medium">Wishing a Good Day!</p>
      </div>
    </div>
  );
};

export default Sidebar;
