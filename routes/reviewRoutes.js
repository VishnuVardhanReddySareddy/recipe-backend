// routes/reviewRoutes.js
const express = require("express");
const { leaveReview, getReviews } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect routes with authentication middleware
router.use(authMiddleware);

// Leave a review for a recipe
router.post("/", leaveReview);

// Get all reviews for a recipe
router.get("/:recipeId", getReviews);

module.exports = router;
