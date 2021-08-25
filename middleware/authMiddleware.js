import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

let rtDecoded = null;
const tokenProtect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Token found");

    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      rtDecoded = decoded;
      //req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  } else if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

const protect = asyncHandler(async (req, res, next) => {
  tokenProtect(req, res, next);
});

const protectAdmin = asyncHandler(async (req, res, next) => {
  tokenProtect(req, res, next);
  console.log(next);
  req.user = await User.findById(rtDecoded.id).select("-password");

  if (req.user && !req.user.isAdmin) {
    throw new Error("Admin only page, you are not Authorized");
  }
});

export { protect, protectAdmin };
