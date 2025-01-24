// controllers/activityFeedController.js
const Recipe = require("../models/Recipe");
const Review = require("../models/Review");
const Follow = require("../models/Follow");
const User = require("../models/User");

// Get activity feed for the authenticated user
const getActivityFeed = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Get the list of users the authenticated user is following
    const following = await Follow.findAll({ where: { followerId: userId } });
    const followingIds = following.map((follow) => follow.followingId);

    // Get recent recipes and reviews from followed users
    const recipes = await Recipe.findAll({
      where: { userId: followingIds },
      order: [["createdAt", "DESC"]],
      limit: 10,
      include: [{ model: User, attributes: ["username"] }],
    });

    const reviews = await Review.findAll({
      where: { userId: followingIds },
      order: [["createdAt", "DESC"]],
      limit: 10,
      include: [
        { model: User, attributes: ["username"] },
        { model: Recipe, attributes: ["title"] },
      ],
    });

    res.status(200).json({ recipes, reviews });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching activity feed", error: err.message });
  }
};

module.exports = { getActivityFeed };
