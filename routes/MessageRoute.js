const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post("/sendMessage", messageController.sendMessage);
router.delete("/:id", messageController.deleteMessage);
module.exports = router;
