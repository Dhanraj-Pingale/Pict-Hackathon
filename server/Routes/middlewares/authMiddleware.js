// middlewares/authMiddleware.js
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware/route handler
    } else {
      return res.status(401).json({ message: "Unauthorized" }); // User is not authenticated
    }
  };
  
  export default isAuthenticated;
  