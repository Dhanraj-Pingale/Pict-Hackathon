import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import authRoutes from "./Routes/authRoutes.js";
import dbRoutes from "./Routes/dbRoutes.js";
import geminiRoutes from "./Routes/gemini.js";
import MongoStore from "connect-mongo";
import getDb from "./models/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // ! important.. Allows cookies to be sent
  methods: ["GET", "POST", "DELETE", "PATCH"], // add multiple if needed
};

// Enable CORS for all origins or specify a particular origin
app.use(cors(corsOptions));

// Middleware to handle JSON requests
app.use(express.json());
app.use(express.static('public'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Avoid resaving session if it wasn't modified
    saveUninitialized: true, // Avoid saving uninitialized sessions
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Your MongoDB connection string
    }),
    cookie: {
      maxAge: 7 * 24 * 1000 * 60 * 60, // 7 days
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Helps prevent XSS attacks
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use auth routes (only for Authentication)
app.use("/auth", authRoutes);

// for database handling... 
app.use("/db", dbRoutes);

//for gemini handling...
app.use("/gemini", geminiRoutes);


// Start the server and connect to MongoDB
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

// handle server shutdown
process.on("SIGINT", async () => {
  const db = getDb();
  console.log("Shutting down Database connection...");

  if (db && db.client) {
    await db.client.close();
  }
  process.exit(0);
});