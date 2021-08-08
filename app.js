const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const http = require("http");
const AppError = require("./AppError");
const viewRouter = require("./routes/viewRoutes");
const MessageRouter = require("./routes/MessageRoute");
const userRouter = require("./routes/userRouter");
const app = express();

app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again later!",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(compression());
app.use((req, res, next) => {
  next();
});
app.use("/", viewRouter);
app.use("/message", MessageRouter);
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can\'t find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
