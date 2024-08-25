const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Organisation = require("./models/Organisation");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// Initialize Express app
const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Registration Endpoint
app.post("/auth/register", async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  const errors = [];

  if (!firstName)
    errors.push({ field: "firstName", message: "First name is required" });
  if (!lastName)
    errors.push({ field: "lastName", message: "Last name is required" });
  if (!email) errors.push({ field: "email", message: "Email is required" });
  if (!password)
    errors.push({ field: "password", message: "Password is required" });

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance
    const user = new User({
      userId: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    // Save the user to the database
    await user.save();
    res.status(201).send("User registered successfully!");

    const orgName = `${firstName}'s Organisiation`;
    const organisation = new Organisation({
      orgId: uuidv4(),
      name: orgName,
    });

    await organisation.save();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/auth/registration", async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

// User Login Endpoint
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Cannot find user");
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const payload = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      };

      const accessToken = jwt.sign(payload);
      res
        .status(200)
        .json({
          status: "success",
          message: `Congratulations, welcome ${user.firstName}`,
          data: { accessToken, user: payload },
        });
    } else {
      return res
        .status(401)
        .json({
          status: "Bad  request",
          message: "Authentication failed",
          statusCode: 401,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const payload = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
    if (!user) {
      return res
        .status(404)
        .json({
          status: "not Found",
          message: "user Not Found",
          statusCode: 404,
        });
    }
    res
      .status(200)
      .json({ status: "success", message: "message", data: { payload } });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        status: "Server Error",
        message: "Server error",
        statusCode: 500,
      });
  }
});

app.get("/api/organisations", async (req, res) => {
  try {
    const organisation = await Organisation.find();
    res.status(200).send(organisation);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        status: "Server Error",
        message: "Server error",
        statusCode: 500,
      });
  }
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
