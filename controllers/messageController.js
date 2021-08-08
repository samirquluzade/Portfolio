const Swal = require("sweetalert2");
const Message = require("../models/MessageModel");
const catchAsync = require("../catchAsync");
const AppError = require("../AppError");

exports.sendMessage = catchAsync(async (req, res, next) => {
  await Message.create({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
});
exports.deleteMessage = catchAsync(async (req, res, next) => {
  const deletedMessage = await Message.findByIdAndDelete(req.params.id);
  if (!deletedMessage) {
    return next(new AppError("No message found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: {
      deletedMessage,
    },
  });
});
