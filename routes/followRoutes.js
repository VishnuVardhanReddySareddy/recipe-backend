// routes/followRoutes.js
const express = require("express");
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require("../controllers/followController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect routes with authentication middleware
router.use(authMiddleware);

// Follow a user
router.post("/", followUser);

// Unfollow a user
router.delete("/:followingId", unfollowUser);

// Get followers of a user
router.get("/followers/:userId", getFollowers);

// Get users followed by a user
router.get("/following/:userId", getFollowing);

module.exports = router;
