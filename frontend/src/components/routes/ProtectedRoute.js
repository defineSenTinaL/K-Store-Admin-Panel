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







// import React from "react";
// import { Route, Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// const SellerRoute = ({ children, ...rest }) => {
//   const { seller } = useSelector((state) => ({ ...state }));

//   return seller && seller.token ? (
//     <Route {...rest} render={() => children} />
//   ) : (
//     <h1 className="text-dagner"> LOADING.....</h1>
//   );
// };

// export default SellerRoute;
