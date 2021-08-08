const mongoose = require("mongoose");
const validator = require("validator");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Adınızı qeyd edin!"],
    },
    email: {
      type: String,
      required: [true, "Email daxil edin!"],
      lowercase: true,
      validate: [validator.isEmail, "Email formatı düzgün deyil!"],
    },
    message: {
      type: String,
      required: [true, "İsmarıcınızı daxil edin!"],
    },
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
