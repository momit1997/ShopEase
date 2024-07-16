const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

const register = (req, res) => {
  const { username, email, password } = req.body;

  const checkUsernameQuery = "SELECT * FROM registration WHERE username = ?";
  db.query(checkUsernameQuery, [username], (err, usernameResults) => {
    if (err) {
      console.error("Error checking username:", err);
      return res.status(500).json({ message: "Failed to register user" });
    }

    if (usernameResults.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const checkEmailQuery = "SELECT * FROM registration WHERE email = ?";
    db.query(checkEmailQuery, [email], (err, emailResults) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ message: "Failed to register user" });
      }

      if (emailResults.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const insertUserQuery =
        "INSERT INTO registration (username, email, password) VALUES (?, ?, ?)";
      db.query(insertUserQuery, [username, email, password], (err, result) => {
        if (err) {
          console.error("Error registering user:", err);
          return res.status(500).json({ message: "Failed to register user" });
        }
        res.status(200).json({ message: "User registered successfully" });
      });
    });
  });
};

const login = (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res
      .status(400)
      .json({ message: "Username or email and password are required" });
  }

  const queryField = usernameOrEmail.includes("@") ? "email" : "username";

  const query = `
    SELECT * FROM registration 
    WHERE ${queryField} = ?
  `;
  db.query(query, [usernameOrEmail], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

    res.json({ token });
  });
};

module.exports = { register, login };
