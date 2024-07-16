import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Registration.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("State before navigation:", { username, email });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      login({ username }); // Replace with actual user data from the API
      // console.log(username);
      // login(username);
      console.log("Registration successful:", response.data.message);
      // console.log(response.data.registered);
      console.log("data", response.data.message);
      console.log(username);
      // Log the data being passed to the UserDetails page
      console.log("Navigating with state:", { username, email });
      navigate("/user-details", { state: { username, email } });
    } catch (error) {
      console.error("Registration failed:", error.message);
      // console.log(error.response.data);
      console.log(error);
      if (
        error.response.data.message === "Email already exists" ||
        error.response.data.message === "Username already exists"
      ) {
        setMsg("Username or Email already exist");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {msg && <p style={{ color: "red", fontSize: "10px" }}>{msg}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
