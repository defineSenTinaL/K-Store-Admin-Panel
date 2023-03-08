import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import background from "../extras/bg.svg";
import image from "../extras/L1.jpg";

const Login = () => {
  return (
    <div
      className='py-sm-5 opacity-100'
      style={{ backgroundImage: `url(${background})`, height: "100vh" }}
    >
      <br />
      <br />
      <br />

      <div
        className=' row h-75 w-50 mx-auto rounded-lg'
        style={{ background: "#EDE9E9" }}
      >
        <div
          className='my-5 w-50 h-75 rounded-lg ml-5 mr-5'
          style={{ backgroundImage: `url(${image})`}}
        />
        <div className='my-5 w-25 bg-white rounded-lg p-5 ml-5 mr-5 '>
          <h3 className='text-left'>Sign In</h3>
          <br />
          <form action=''>
            <CustomInput type='text' placeholder='Email Address' id='email' />
            <CustomInput type='password' placeholder='Password' id='pass' />
            <Link
              to='/admin'
              className='border-0 px-3 py-3 fw-bold w-50'
              style={{ background: "red" }}
              type='submit'
            ></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
