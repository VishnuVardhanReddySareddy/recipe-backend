// routes/adminUserRoutes.js
const express = require("express");
const {
  getAllUsers,
  banUser,
  unbanUser,
} = require("../controllers/adminUserController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Protect routes with authentication and admin middleware
router.use(authMiddleware);
router.use(adminMiddleware);

// Get all users
router.get("/", getAllUsers);

// Ban a user
router.put("/ban/:userId", banUser);

// Unban a user
router.put("/unban/:userId", unbanUser);

module.exports = router;
