import { Router } from "express";
import getDb from "../models/db.js";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

const router = Router();

// Sign Up
router.post("/signup", async (req, res) => {
  const db = getDb();
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await db.collection("users").findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username: username,
      email: email,
      password: hashedPassword,
    }

    // Save the user
    let response = await db.collection("users").insertOne(newUser);
    console.log("res while /signup : ", response);

    if (response.acknowledged) {
      console.log("new user created");
      res.status(200).json({ msg: "new user created" });
    }
  } catch (err) {
    console.error("Sign-up error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", (req, res, next) => {
  console.log("reached router.post: ", req.body);

  passport.authenticate("local", (err, user, info) => {
    console.log(
      "Passport.authenticate: err: ",
      err,
      "user: ",
      user,
      "info: ",
      info
    );

    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.msg });

    req.logIn(user, (err) => {
      if (err) return next(err);

      //Add some logging to check if the session is being set and retrieved correctly.
      console.log("Session:", req.session);
      console.log("User in session:", req.user);

      return res.status(200).json({
        message: info.msg,
        username: req.user.username,
        email: req.user.email,
        //add pic here...
      });
    });
  })(req, res, next);
});

router.get("/check-auth", (req, res) => {
  console.log("reached router.get: /check-auth ");

  if (req.isAuthenticated()) {
    console.log("authenticated");
    console.log(req.user);

    res.status(200).json({
      isAuthenticated: true,
      username: req.user.username,
      email: req.user.email,
      // add pic here
    });
  } else {
    console.log("Un-authenticated");
    res.status(201).json({ isAuthenticated: false });
  }
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ msg: "log out successfully" });
  });
});

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      console.log("username: ", username, "pass: ", password);

      const db = getDb();
      // Check if user exists
      let user = await db.collection("users").findOne({ email: username });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
          return cb(null, false, { msg: "Wrong password" });
        }

        return cb(null, user, { msg: "Login Successful" });
      } else {
        return cb(null, false, { msg: "User not found" });
      }
    } catch (err) {
      console.log(err);
      return cb(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
  console.log("serialize: ", user);

  return cb(null, user.email);
});

passport.deserializeUser(async (email, cb) => {
  try {
    console.log("deserialize email: ", email);

    const db = getDb(); // Assuming getDb is your function to get the database connection
    const user = await db.collection("users").findOne({ email: email });
    console.log("deserialize find: ", user);

    // Full user object is now available in `user`
    cb(null, user);
  } catch (err) {
    console.error("deserialize error: ", err);

    cb(err);
  }
});

export default router;
