const catchAsync = require("../catchAsync");
const Message = require("../models/MessageModel");

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render("overview", {
    title: "Welcome To My Portfolio",
  });
});
exports.getLogin = (req, res) => {
  res.status(200).render("login", {
    title: "Hesaba daxil ol",
  });
};
exports.getManageMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).render("MessageList", {
    title: "Message List",
    messages,
  });
});
