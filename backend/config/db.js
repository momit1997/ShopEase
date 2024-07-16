const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "reactapp",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS registration (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      throw err;
    }
  });
});

module.exports = db;

// const { Sequelize } = require("sequelize");

// // Initialize the connection to the database
// const sequelize = new Sequelize("reactapp", "root", "password", {
//   host: "localhost",
//   dialect: "mysql",
// });

// const connectDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection to MySQL has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS registration (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       username VARCHAR(255) NOT NULL UNIQUE,
//       email VARCHAR(255) NOT NULL UNIQUE,
//       password VARCHAR(255) NOT NULL
//     )
//   `;

// sequelize.query(createTableQuery, (err, result) => {
//   if (err) {
//     console.error("Error creating table:", err);
//     throw err;
//   }
// });

// module.exports = { connectDatabase, sequelize };
