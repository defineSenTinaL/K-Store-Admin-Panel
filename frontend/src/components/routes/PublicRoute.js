import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';

const PublicRoute = () => {
  const { seller } = useSelector((state) => ({ ...state }));
  const isAuthenticated = seller && seller.token;

  // Use local state for loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate some asynchronous task, like fetching data
    // Here, setTimeout is used to simulate the loading delay
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Change the timeout as needed

    // Clean up the timeout when the component unmounts or when loading state changes
    return () => clearTimeout(loadingTimeout);
  }, []);

  if (isLoading) {
    // Show loading spinner while data is being loaded
    return (
      <div className="center-content">
        <Spin size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');
    if (lastVisitedRoute) {
      return <Navigate to={lastVisitedRoute} />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
