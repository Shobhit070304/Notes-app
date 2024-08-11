import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import Nav from "../../components/Navbar/Nav";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
    }

    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.renponse.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="bg-zinc-900 min-h-screen"> 
        <Nav />
        <div className=" px-6 flex items-center justify-center mt-28 ">
          <div className="w-96 border rounded  px-7 py-10 bg-zinc-800 text-white">
            <form onSubmit={handleLogin}>
              <h4 className="text-3xl mb-8  text-white">Login</h4>
              <label className="text-zinc-200 text-sm" htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Email"
                className="input-box mt-1"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <PasswordInput
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
              <button type="submit" className="btn-primary">
                Login
              </button>
              <p className="text-sm text-center mt-4 text-white">
                Not registered yet?&nbsp;
                <Link
                  to="/signUp"
                  className="font-medium text-primary underline "
                >
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
