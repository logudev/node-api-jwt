const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const jwtSecretKey = "logusecretkey";

// Middleware to verify the jwt token sent in request headers
const verifyToken = (req, res, next) => {
  // Authorization: Bearer <jwt token>
  // Get the Authorization header from req
  const authHeader = req.headers["authorization"];
  try {
    if (authHeader) {
      // Split the auth header at space, 1st element will be 'Bearer' , 2nd element will be jwt token
      const authHeaderSplit = authHeader.split(" ");
      // Fetching the jwt token
      const token = authHeaderSplit[1];
      // Setting token in req
      req.token = token;

      // Verfiying the token and decoding the data
      jwt.verify(req.token, jwtSecretKey, (err, authData) => {
        if (err)
          return res.status(401).json({
            success: false,
            msg: "Authorization Header verification failure",
          });

        req.authData = authData;
        // Token verification successful, proceeding
        next();
      });
    } else {
      return res.status(401).json({
        success: false,
        msg: "Authorization Header is undefined",
      });
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "Authorization Header is undefined",
    });
  }
};

// Get all posts api
app.get("/api/posts", (req, res) => {
  return res.json({
    msg: "Get all posts",
  });
});

// Create post api
app.post("/api/posts", verifyToken, (req, res) => {
  return res.json({
    msg: "Create a post",
    authData: req.authData,
  });
});

// Auth API to get token
app.post("/api/auth", (req, res) => {
  // Use a mock user
  const user = {
    id: 123,
    username: "logu",
    email: "logudev@gmail.com",
  };

  // Creating the token with user object as payload with our custom secretkey
  jwt.sign({ user }, jwtSecretKey, { expiresIn: "30s" }, (err, token) => {
    if (err) throw err;
    return res.status(200).json({
      token,
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
