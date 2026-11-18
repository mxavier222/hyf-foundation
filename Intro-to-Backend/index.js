const express = "express";
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Connect to SQLite database
const db = new Database("users.db");

// Create users table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`,
).run();

console.log("Database connected successfully!");

// HOME ROUTE - HTML USER DASHBOARD

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Dashboard</title>

      <style>
        * {
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
        }

        .container {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          width: 90%;
          max-width: 450px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        h1 {
          color: #333;
        }

        p {
          color: #777;
        }

        .count {
          font-size: 65px;
          font-weight: bold;
          color: #667eea;
          margin: 25px;
        }

        button {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
        }

        button:hover {
          background: #764ba2;
        }

        #message {
          margin-top: 15px;
          font-size: 13px;
          color: #e53e3e;
        }
      </style>
    </head>

    <body>

      <div class="container">

        <h1>Welcome to My API! 👋</h1>

        <p>Here is your user database overview.</p>

        <div class="count" id="userCount">Loading...</div>

        <p>Total Registered Users</p>

        <button onclick="getUserCount()">
          Refresh Count
        </button>

        <div id="message"></div>

      </div>

      <script>
        async function getUserCount() {

          const countElement = document.getElementById("userCount");
          const messageElement = document.getElementById("message");

          try {
            const response = await fetch("/user-count");

            if (!response.ok) {
              throw new Error("Could not load user count");
            }

            const data = await response.json();

            countElement.textContent = data.count;
            messageElement.textContent = "";

          } catch (error) {

            countElement.textContent = "Error";
            messageElement.textContent = error.message;

          }
        }

        // Load user count when the page opens
        getUserCount();

      </script>

    </body>
    </html>
  `);
});

// ROUTE 1 - SERVER STATUS

app.get("/api/status", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running!",
    uptime: process.uptime(),
  });
});

// ROUTE 2 - CURRENT DATE AND TIME

app.get("/api/time", (req, res) => {
  res.json({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    timestamp: new Date().toISOString(),
  });
});

// ROUTE 3 - API INFORMATION

app.get("/api/info", (req, res) => {
  res.json({
    name: "My User API",
    version: "1.0.0",
    description: "An API for managing users",
    endpoints: [
      "/",
      "/api/status",
      "/api/time",
      "/api/info",
      "/user-count",
      "/users",
    ],
  });
});

// ROUTE 4 - GET TOTAL USER COUNT

app.get("/user-count", (req, res) => {
  const result = db.prepare("SELECT COUNT(*) AS count FROM users").get();

  res.json(result);
});

// ROUTE 5 - ADD A NEW USER

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    !name.trim() ||
    !email.trim()
  ) {
    return res.status(400).json({
      error: "Valid name and email are required",
    });
  }

  try {
    const result = db
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .run(name.trim(), email.trim());

    res.status(201).json({
      message: "User added successfully!",
      id: result.lastInsertRowid,
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
