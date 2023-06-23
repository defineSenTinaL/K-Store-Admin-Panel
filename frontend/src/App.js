import React, { Component, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./components/MainLayout";
import ProductList from "./pages/ProductList";
import ProductAdd, {
  BasicDetails,
  Description,
  FullDetails,
  Images,
  Keyword,
  MoreDetails,
} from "./pages/ProductAdd";
import CategoryAdd from "./pages/CategoryAdd";
import CategoryList from "./pages/CategoryList";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
//import  store from './store/configureStore';
import { setLoggedInSeller } from "./features/seller/sellerSlice";

import { currentSeller } from "./functions/auth";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Profile from "./pages/Profile";



class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}



const App = () => {
  const dispatch = useDispatch();
  // to check firebase auth state, it is also used to prevent memory leak after using unsubscribe it will clear the store
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (seller) => {
      if (seller) {
        const idTokenResult = await seller.getIdTokenResult();
        //console.log("Seller", seller);

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
    });
    // cleanUp
    return () => unsubscribe();
  });



  return (
    <ErrorBoundary>
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register/>} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="productList" element={<ProductList />} />
            <Route path="addProduct" element={<ProductAdd />}>
              <Route path="basicDetails" element={<BasicDetails />} />
              <Route path="fullDetails" element={<FullDetails />} />
              <Route path="images" element={<Images />} />
              <Route path="description" element={<Description />} />
              <Route path="keywords" element={<Keyword />} />
              <Route path="moreDetails" element={<MoreDetails />} />
            </Route>
            <Route path="addCategory" element={<CategoryAdd />} />
            <Route path="categoryList" element={<CategoryList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </ErrorBoundary>
  );
};

export default App;
