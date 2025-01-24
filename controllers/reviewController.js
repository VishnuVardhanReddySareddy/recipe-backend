// controllers/reviewController.js
const Review = require("../models/Review");
const User = require("../models/User");
// Leave a review for a recipe
const leaveReview = async (req, res) => {
  const { recipeId, comment } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the user has already reviewed the recipe
    const existingReview = await Review.findOne({
      where: { userId, recipeId },
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this recipe" });
    }

    // Add the review
    await Review.create({ userId, recipeId, comment });
    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding review", error: err.message });
  }
};

// Get all reviews for a recipe
const getReviews = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { recipeId },
      include: [{ model: User, attributes: ["username"] }],
    });

    res.status(200).json({ reviews });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: err.message });
  }
};

module.exports = { leaveReview, getReviews };
