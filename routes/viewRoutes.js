const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", viewsController.getOverview);
router.get("/login", authController.isLoggedIn, viewsController.getLogin);
router.get(
  "/manageMessages",
  authController.protect,
  viewsController.getManageMessages
);

module.exports = router;
