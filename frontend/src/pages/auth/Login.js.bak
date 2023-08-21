import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Spin } from "antd"; // Import Spin
import background from "./images/background.png";
import loginImg from "./images/login.png";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { auth } from "../../firebase.js";
import { useDispatch } from "react-redux";

import { setLoggedInSeller } from "../../features/seller/sellerSlice";

import { currentSeller } from "../../functions/auth";

const FormItem = Form.Item;

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
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="loginLayout">
        <div className="lItem">
          <div className="loginImage">
            <img
              src={loginImg}
              width="300"
              style={{ position: "relative" }}
              alt="login"
            />
          </div>
          <div className="loginForm">
            <h2>Login</h2>
            <Spin spinning={loading}> {/* Wrap form with Spin */}
              <Form className="login-form" onSubmitCapture={handleSubmmit}>
                <FormItem>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your Email address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    autoFocus
                  />
                </FormItem>
                <FormItem>
                  <Input
                    prefix={<KeyOutlined />}
                    placeholder="Enter your Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                </FormItem>
                <FormItem>
                  <Checkbox>Remember me</Checkbox>
                </FormItem>
                <Button
                  name="submit"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={!email || password.length < 6 || loading}
                >
                  Log in
                </Button>
                <br />
                <br />
                <br />
              </Form>
            </Spin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
