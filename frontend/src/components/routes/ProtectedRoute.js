import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';

const ProtectedRoute = () => {
  const { seller } = useSelector((state) => ({ ...state }));
  const isAuthenticated = seller && seller.token;

  // Use local state for loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate some asynchronous task, like fetching data
    // Here, setTimeout is used to simulate the loading delay
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Change the timeout as needed

    // Clean up the timeout when the component unmounts or when loading state changes
    return () => clearTimeout(loadingTimeout);
  }, []);

  // Clean up lastVisitedRoute when the component unmounts
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = () => {
    // Remove the lastVisitedRoute from local storage when the user leaves the page
    localStorage.removeItem('lastVisitedRoute');
  };

  if (isLoading) {
    // Show loading spinner while data is being loaded
    return (
      <div className="center-content">
        <Spin size="large" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;