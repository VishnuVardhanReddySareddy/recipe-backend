// controllers/favoriteController.js
const Favorite = require("../models/Favorite");
const Recipe = require("../models/Recipe");
const User = require("../models/User");

// Add a recipe to favorites
const addFavorite = async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the recipe is already favorited
    const existingFavorite = await Favorite.findOne({
      where: { userId, recipeId },
    });
    if (existingFavorite) {
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

    // Add to favorites
    await Favorite.create({ userId, recipeId });
    res.status(201).json({ message: "Recipe added to favorites" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to favorites", error: err.message });
  }
};

// Remove a recipe from favorites
const removeFavorite = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.userId;

  try {
    const favorite = await Favorite.findOne({ where: { userId, recipeId } });
    if (!favorite) {
      return res.status(404).json({ message: "Recipe not found in favorites" });
    }

    await favorite.destroy();
    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing from favorites", error: err.message });
  }
};

// Get all favorite recipes for a user
const getFavorites = async (req, res) => {
  const userId = req.user.userId;

  try {
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [
        { model: Recipe, include: [{ model: User, attributes: ["username"] }] },
      ],
    });

    res.status(200).json({ favorites });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching favorites", error: err.message });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
