import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const requireAuth = (req, res, next) => {
  // console.log("req cookies: ",req?.cookies?.token);
  const token =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch (err) {
    // console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
