import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import Nav from "../../components/Navbar/Nav";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email");
    } else if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    //SignUp API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.error);
        return;
      }

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
  }
  return (
    <>
      <div className="min-h-screen bg-zinc-900">
        <Nav />
        <div className="px-6 flex items-center justify-center mt-28">
          <div className="w-96 border rounded  px-7 py-10 bg-zinc-800 text-white">
            <form onSubmit={handleSignUp}>
              <h4 className="text-3xl mb-8 text-white">SignUp</h4>
              <label className="text-zinc-200 text-sm" htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="input-box mt-1"
                value={name}
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label className="text-zinc-200 text-sm" htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Email"
                className="input-box mt-1"
                value={email}
                name="email"
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
                SignUp
              </button>
              <p className="text-sm text-center mt-4 text-white">
                Already registered?&nbsp;
                <Link
                  to="/login"
                  className="font-medium text-primary underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
