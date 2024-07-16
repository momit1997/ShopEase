import React from "react";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
  const location = useLocation();
  const { username, email } = location.state || {};
  console.log("Location state:", location.state);

  return (
    <div>
      <h1>User Details</h1>
      {username && email ? (
        <div>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserDetails;
