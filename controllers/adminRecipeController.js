// controllers/adminRecipeController.js
const Recipe = require("../models/Recipe");
const User = require("../models/User");

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    res.status(200).json({ recipes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching recipes", error: err.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await recipe.destroy();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting recipe", error: err.message });
  }
};

module.exports = { getAllRecipes, deleteRecipe };
