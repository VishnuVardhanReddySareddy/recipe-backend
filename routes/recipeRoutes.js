// routes/recipeRoutes.js
const express = require("express");
const {
  createRecipe,
  editRecipe,
  deleteRecipe,
  browseRecipes,
  searchRecipes,
  filterRecipes,
} = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes (no authentication required)
router.get("/", browseRecipes); // Browse all recipes
router.get("/search", searchRecipes); // Search recipes
router.get("/filter", filterRecipes); // Filter recipes

// Protected routes (require authentication)
router.use(authMiddleware);
router.post("/", createRecipe);
router.put("/:recipeId", editRecipe);
router.delete("/:recipeId", deleteRecipe);

module.exports = router;
