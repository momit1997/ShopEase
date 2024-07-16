// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql = require("mysql");
// const jwt = require("jsonwebtoken");

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "reactapp",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     throw err;
//   }
//   console.log("Connected to MySQL");

//   // Ensure database table exists or create it if not
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS registration (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       username VARCHAR(255) NOT NULL UNIQUE,
//       email VARCHAR(255) NOT NULL UNIQUE,
//       password VARCHAR(255) NOT NULL
//     )
//   `;

//   db.query(createTableQuery, (err, result) => {
//     if (err) {
//       console.error("Error creating table:", err);
//       throw err;
//     }
//     // console.log("Registration table created or already exists");
//   });
// });

// app.post("/register", (req, res) => {
//   const { username, email, password } = req.body;
//   console.log(req.body);
//   console.log("Received registration request:", username, email, password);

//   // Check if username exists
//   const checkUsernameQuery = "SELECT * FROM registration WHERE username = ?";
//   db.query(checkUsernameQuery, [username], (err, usernameResults) => {
//     if (err) {
//       console.error("Error checking username:", err);
//       return res.status(500).json({ message: "Failed to register user" });
//     }
//     console.log("Username results:", usernameResults);

//     if (usernameResults.length > 0) {
//       // Username already exists
//       console.log("Username already exists");
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     // Check if email exists
//     const checkEmailQuery = "SELECT * FROM registration WHERE email = ?";
//     db.query(checkEmailQuery, [email], (err, emailResults) => {
//       if (err) {
//         console.error("Error checking email:", err);
//         return res.status(500).json({ message: "Failed to register user" });
//       }
//       console.log("Email results:", emailResults);

//       if (emailResults.length > 0) {
//         // Email already exists
//         console.log("Email already exists");
//         return res.status(400).json({ message: "Email already exists" });
//       }
//       // If neither username nor email exists, proceed to insert
//       const insertUserQuery =
//         "INSERT INTO registration (username, email, password) VALUES (?, ?, ?)";
//       db.query(insertUserQuery, [username, email, password], (err, result) => {
//         if (err) {
//           console.error("Error registering user:", err);
//           return res.status(500).json({ message: "Failed to register user" });
//         }
//         console.log("User registered successfully");
//         res.status(200).json({ message: "User registered successfully" });
//       });
//     });
//   });
// });

// app.post("/login", (req, res) => {
//   const { usernameOrEmail, password } = req.body;

//   if (!usernameOrEmail || !password) {
//     return res
//       .status(400)
//       .json({ message: "Username or email and password are required" });
//   }

//   // Determine if the identifier is an email or username
//   const queryField = usernameOrEmail.includes("@") ? "email" : "username";

//   // Find user by username or email in the database
//   const query = `
//     SELECT * FROM registration
//     WHERE ${queryField} = ?
//   `;
//   db.query(query, [usernameOrEmail], (err, results) => {
//     if (err) {
//       console.error("Error querying database:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const user = results[0];

//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });

//     res.json({ token });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// // app.post("/login", (req, res) => {
// //   const { username, email, password } = req.body;

// //   // Determine if username or email is provided
// //   const identifier = username || email;
// //   const queryField = username ? "username" : "email";

// //   if (!identifier || !password) {
// //     return res
// //       .status(400)
// //       .json({ message: "Username or email and password are required" });
// //   }

// //   // Find user by username or email in the database
// //   const query = `
// //     SELECT * FROM registration
// //     WHERE ${queryField} = ?
// //   `;
// //   db.query(query, [identifier], (err, results) => {
// //     if (err) {
// //       console.error("Error querying database:", err);
// //       return res.status(500).json({ message: "Internal server error" });
// //     }

// //     if (results.length === 0) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     const user = results[0];

// //     if (user.password !== password) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });

// //     res.json({ token });
// //   });
// // });

// // // Login endpoint
// // app.post("/login", (req, res) => {
// //   const { usernameOrEmail, password } = req.body;

// //   // Find user by username or email in the database
// //   const query = `
// //     SELECT * FROM registration
// //     WHERE username = ? OR email = ?
// //   `;
// //   db.query(query, [usernameOrEmail, usernameOrEmail], (err, results) => {
// //     if (err) {
// //       console.error("Error querying database:", err);
// //       return res.status(500).json({ message: "Internal server error" });
// //     }

// //     if (results.length === 0) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     const user = results[0];

// //     if (user.password !== password) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });

// //     res.json({ token });
// //   });
// // });

// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });

// // app.post("/register", (req, res) => {
// //   const { username, email, password } = req.body;
// //   // console.log("Received registration request:", username, email, password);

// //   // Check if username exists
// //   const checkUsernameQuery = "SELECT * FROM registration WHERE username = ?";
// //   db.query(checkUsernameQuery, [username], (err, usernameResults) => {
// //     if (err) {
// //       console.error("Error checking username:", err);
// //       return res.status(500).json({ message: "Failed to register user" });
// //     }
// //     console.log(usernameResults.length);

// //     if (usernameResults.length > 0) {
// //       // Username already exists
// //       console.log("inside");
// //       return res.status(400).json({ message: "Username already exists" });
// //     }

// //     // Check if email exists
// //     const checkEmailQuery = "SELECT * FROM registration WHERE email = ?";
// //     db.query(checkEmailQuery, [email], (err, emailResults) => {
// //       if (err) {
// //         console.error("Error checking email:", err);
// //         return res.status(500).json({ message: "Failed to register user" });
// //       }

// //       if (emailResults.length > 0) {
// //         // Email already exists
// //         return res.status(400).json({ message: "Email already exists" });
// //       }

// //       // If neither username nor email exists, proceed to insert
// //       const insertUserQuery =
// //         "INSERT INTO registration (username, email, password) VALUES (?, ?, ?)";
// //       db.query(insertUserQuery, [username, email, password], (err, result) => {
// //         if (err) {
// //           console.error("Error registering user:", err);
// //           return res.status(500).json({ message: "Failed to register user" });
// //         }
// //         console.log("User registered successfully");
// //         res.status(200).json({ message: "User registered successfully" });
// //       });
// //     });
// //   });
// // });

// //register EndPoint

const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
