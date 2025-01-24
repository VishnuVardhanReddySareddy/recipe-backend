// routes/activityFeedRoutes.js
const express = require("express");
const { getActivityFeed } = require("../controllers/activityFeedController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect routes with authentication middleware
router.use(authMiddleware);

// Get activity feed
router.get("/", getActivityFeed);

module.exports = router;
