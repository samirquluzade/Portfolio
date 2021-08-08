const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Swal = require("sweetalert2");
const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsync = require("../catchAsync");
const AppError = require("../AppError");

const signToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true; // HTTPS
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
  user.password = undefined;
};
// exports.signUp = catchAsync(async (req, res, next) => {
//   await User.create({
//     role: req.body.role,
//     email: req.body.email,
//     password: req.body.password,
//   });
// });
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const admin = await User.findOne({ email }).select("+password");
  const correct = await admin.correctPassword(password, admin.password);
  if (!admin || !correct) {
    return next(new AppError("Incorrect email or password", 401));
  }
  createSendToken(admin, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Getting token and check of it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  // Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // Verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // There is a logged in user
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next(new AppError("Error", 401));
    }
  }
  next();
};
