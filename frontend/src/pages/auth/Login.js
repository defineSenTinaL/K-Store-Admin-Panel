import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd"; // Import Spin
import background from "./images/background.png";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { auth } from "../../firebase.js";
import { useDispatch } from "react-redux";

import { setLoggedInSeller } from "../../features/seller/sellerSlice";

import { currentSeller } from "../../functions/auth";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(window.localStorage.get);
  }, []);

  const handleSubmmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const seller = result.user;
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

      localStorage.setItem("lastVisitedRoute", window.location.pathname);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Always set loading to false after login attempt
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>
              <form onSubmit={handleSubmmit}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email} // Add this line
                  onChange={(e) => setemail(e.target.value)} // Add this line
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password} // Add this line
                  onChange={(e) => setPassword(e.target.value)} // Add this line
                />

                <MDBCheckbox
                  name="flexCheck"
                  id="flexCheckDefault"
                  className="mb-4"
                  label="Remember password"
                />

                <MDBBtn
                  className="mx-2 my-5 px-5 w-100"
                  color="dark"
                  size="lg"
                  type="submit"
                >
                  Login
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
