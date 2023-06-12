import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import background from "./images/background.png";
import loginImg from './images/login.png';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
//import '../App.css';

const FormItem = Form.Item;

const Login = () => {
  return (
    <div style= {{backgroundImage: `url(${background})`, backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'}}>
    <div className="loginLayout" >
      <div className="lItem">
          <div className="loginImage">
            <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
          </div>
          <div className="loginForm">
            <h2>Login</h2>
              <Form className="login-form">
              <FormItem>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                  />
              </FormItem>
              <FormItem>
                  <Input
                    prefix={<KeyOutlined />}
                    type="password"
                    placeholder="Password"
                  />
                
              </FormItem>
              <FormItem>
                <Checkbox>Remember me</Checkbox>
              </FormItem>
              <Link to='/admin'>
              <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Link>
              <br></br>
              <br></br>
              <br></br>
            </Form>
          </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
