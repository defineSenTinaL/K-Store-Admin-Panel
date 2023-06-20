import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { seller } = useSelector((state) => ({ ...state }));

  const isAuthenticated = seller && seller.token;

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
