import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();


// console.log('jwtsecret',jwtsecret);
// console.log('jwt env', process.env.JWT_SECRET);
export const verifyToken=(req, res, next) => {
    const jwtsecret = process.env.JWT_SECRET;
    //console.log("jwt token inside middleware auth",jwtsecret);
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }
  
    jwt.verify(token, jwtsecret, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      req.userId = decoded.id;
      next();
    });
  };