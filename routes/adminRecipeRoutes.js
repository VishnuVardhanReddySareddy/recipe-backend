// routes/adminRecipeRoutes.js
const express = require("express");
const {
  getAllRecipes,
  deleteRecipe,
} = require("../controllers/adminRecipeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Protect routes with authentication and admin middleware
router.use(authMiddleware);
router.use(adminMiddleware);

// Get all recipes
router.get("/", getAllRecipes);

// Delete a recipe
router.delete("/:recipeId", deleteRecipe);

module.exports = router;
