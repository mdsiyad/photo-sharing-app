import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../utils/API";

const Register = ({ socket }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const register = async (name, email, username, password) => {
    try {
      const response = await API.post("/api/users/register", {
        name,
        email,
        username,
        password,
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (username.trim() && password.trim() && email.trim() && name.trim()) {
        const response = await register(name, email, username, password);
  
        //👇🏻 check a register response
        
        if (response.status === 200) {
          toast.success(response.data.message);
          setPassword("");
          setUsername("");
          setEmail("");
          setName("");
          //👇🏻 Navigate user to login page
          navigate("/");
        }  
      
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
   
  };

  //👇🏻 Add a useEffect hook that listens to both both events
  // useEffect(() => {
  //     socket.on("registerSuccess", (data) => {
  //         toast.success(data);
  //         //👇🏻 navigates to the login page
  //         navigate("/");
  //     });
  //     socket.on("registerError", (error) => {
  //         toast.error(error);
  //     });
  // }, [socket, navigate]);

  return (
    <div className="register">
      <h2 style={{ marginBottom: "30px" }}>Register</h2>
      <form className="register__form" method="POST" onSubmit={handleRegister}>
        <label htmlFor="email">Full Name</label>
        <input
          type="text"
          className="input"
          name="name"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          className="input"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="input"
          name="username"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="input"
          name="password"
          id="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerBtn">REGISTER</button>
        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link className="link" to="/">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
