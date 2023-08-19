import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { setLoggedInSeller } from "./features/seller/sellerSlice";
import { currentSeller } from "./functions/auth";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductList from "./pages/ProductList";
import ProductAdd from "./pages/ProductAdd";
import CategoryAdd from "./pages/CategoryAdd";
import CategoryList from "./pages/CategoryList";
import Profile from "./pages/Profile";
import ProductEdit from "./pages/ProductEdit";
import ManageOrder from "./pages/ManageOrder";
import Order from "./pages/Order";
import ManageReturn from "./pages/ManageReturn";
import OrderDetail from "./pages/OrderDetail";
import OrderSchedule from "./pages/OrderSchedule";
import ShiprocketLogin from "./pages/auth/ShiprocketLogin";
import { setToken } from "./features/shiprocket/shiprocketSlice";
import OrderReturn from "./pages/OrderReturn";
import { Spin } from "antd";
import ProductDelete from "./pages/ProductDelete";

const App = () => {
  const dispatch = useDispatch();
  //const { loading } = useSelector((state) => state.loading);
  const [initialRoute, setInitialRoute] = useState("/"); // Default initial route
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //dispatch(setLoading());
    const unsubscribe = auth.onAuthStateChanged(async (seller) => {
      if (seller) {
        const idTokenResult = await seller.getIdTokenResult();
        currentSeller(idTokenResult.token)
          .then((res) => {
            dispatch(
              setLoggedInSeller({
                name: res.name,
                email: res.email,
                token: idTokenResult.token,
                id: res.id,
              })
            );
          })
          .catch((err) => console.log(err));
      }
      //dispatch(resetLoading());
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const storedToken = localStorage.getItem("shiprocketToken");
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
    setLoading(false);
    const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");
    setInitialRoute(lastVisitedRoute || "/");
  }, [dispatch]);

  if (isLoading) {
    // Show loading spinner while data is being loaded
    return (
      <div className="center-content">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="productList" element={<ProductList />} />
            <Route path="addProduct" element={<ProductAdd />} />
            <Route path="deleteProduct" element={<ProductDelete />} />
            <Route path="addCategory" element={<CategoryAdd />} />
            <Route path="categoryList" element={<CategoryList />} />
            <Route path="manageOrder" element={<ManageOrder />} />
            <Route path="manageReturn" element={<ManageReturn />} />
            <Route path="order" element={<Order />} />
            <Route path="orderDetail" element={<OrderDetail />} />
            <Route path="orderSchedule" element={<OrderSchedule />} />
            <Route path="shiprocketLogin" element={<ShiprocketLogin />} />
            <Route path="orderReturn" element={<OrderReturn />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
