const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // If no token is found
  if (!token) return res.status(401).json({ message: "No token provided" });

  // Ensure that JWT_SECRET is defined
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res
      .status(500)
      .json({ message: "Server error: JWT secret not set." });
  }

  // Verify the token
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err); // Log the error
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Attach the decoded user info to req.user
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { authenticateToken };
