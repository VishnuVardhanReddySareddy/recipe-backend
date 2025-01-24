// controllers/ratingController.js
const Rating = require("../models/Rating");
const Recipe = require("../models/Recipe");

// Rate a recipe
const rateRecipe = async (req, res) => {
  const { recipeId, rating } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the user has already rated the recipe
    const existingRating = await Rating.findOne({
      where: { userId, recipeId },
    });
    if (existingRating) {
      return res
        .status(400)
        .json({ message: "You have already rated this recipe" });
    }

    // Add the rating
    await Rating.create({ userId, recipeId, rating });

    // Update the recipe's average rating
    const ratings = await Rating.findAll({ where: { recipeId } });
    const totalRatings = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRatings / ratings.length;

    await Recipe.update({ averageRating }, { where: { recipeId } });

    res
      .status(201)
      .json({ message: "Recipe rated successfully", averageRating });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error rating recipe", error: err.message });
  }
};

module.exports = { rateRecipe };
