// routes/favoriteRoutes.js
const express = require("express");
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect routes with authentication middleware
router.use(authMiddleware);

// Add a recipe to favorites
router.post("/", addFavorite);

// Remove a recipe from favorites
router.delete("/:recipeId", removeFavorite);

// Get all favorite recipes for a user
router.get("/", getFavorites);

module.exports = router;
