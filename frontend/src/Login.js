import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext, useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const { login } = useContext(AuthContext);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          usernameOrEmail,
          password,
        }
      );

      const { token } = response.data;
      console.log(usernameOrEmail);
      console.log(response.data);
      localStorage.setItem("token", token);

      login({ usernameOrEmail });

      navigate("/success-page");
    } catch (error) {
      console.error("Login failed:", error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username or Email"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
