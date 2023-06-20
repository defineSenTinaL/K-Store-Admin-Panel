import React, { useState, useEffect } from "react";

import { auth } from "../../firebase.js";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { createSeller } from "../../functions/auth.js";

import { useDispatch, useSelector } from "react-redux";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { setLoggedInSeller } from "../../features/seller/sellerSlice.js";

const Register = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const { seller } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    console.log(window.localStorage.get);
  }, []);

  const handleSubmmit = async (e) => {
    e.preventDefault();
    // validation
    if (!name) {
      toast.error("Name is required!");
      return;
    }

    if (!email || !password) {
      toast.error("Email and Password is required!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password min length 6 character log");
      return;
    }

    const result = await auth.createUserWithEmailAndPassword(email, password);

    if (!result.user.emailVerified) {
      //get user id token
      let user = auth.currentUser;
      const idTokenResult = await user.getIdTokenResult();

      createSeller(idTokenResult.token, name);
      // .then( res => console.log("Create Seller in database", res))
      // .catch()

      // redux store
      //console.log("user", user, "idTokenResult", idTokenResult);
      dispatch(
        setLoggedInSeller({
          name: name,
          email: email,
          token: idTokenResult.token,
        })
      );
      //redirect
      navigate("dashboard");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <form onSubmit={handleSubmmit}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    name="name"
                    label="Your Full Name"
                    id="formName"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    name="email"
                    label="Your Email"
                    id="formEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    name="password"
                    label="Password"
                    id="formPass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="form-check d-flex justify-content-center mb-5 ">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form"
                  />
                  <label className="form-check-label" id="form">
                    I agree all statements in <a href="#!">Terms of service</a>
                  </label>
                </div>

                <MDBBtn name="submit" className="mb-4" size="lg" type="submit">
                  Register
                </MDBBtn>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </form>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register;
