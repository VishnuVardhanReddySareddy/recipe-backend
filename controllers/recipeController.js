const User = require("../models/User");
const Recipe = require("../models/Recipe");
const { Op } = require("sequelize");

// Create a new recipe
const createRecipe = async (req, res) => {
  const {
    title,
    ingredients,
    instructions,
    cookingTime,
    servings,
    dietaryPreferences,
    difficultyLevel,
    imageUrl,
  } = req.body;
  const userId = req.user.userId; // Extracted from JWT token

  try {
    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cookingTime,
      servings,
      dietaryPreferences,
      difficultyLevel,
      imageUrl,
      userId,
    });

    res.status(201).json({
      message: "Recipe created successfully",
      recipeId: newRecipe.recipeId,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating recipe", error: err.message });
  }
};

// Edit a recipe
const editRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const {
    title,
    ingredients,
    instructions,
    cookingTime,
    servings,
    dietaryPreferences,
    difficultyLevel,
    imageUrl,
  } = req.body;
  const userId = req.user.userId;

  try {
    const recipe = await Recipe.findOne({ where: { recipeId, userId } });
    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Recipe not found or unauthorized" });
    }

    await recipe.update({
      title,
      ingredients,
      instructions,
      cookingTime,
      servings,
      dietaryPreferences,
      difficultyLevel,
      imageUrl,
    });

    res.status(200).json({ message: "Recipe updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating recipe", error: err.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.userId;

  try {
    const recipe = await Recipe.findOne({ where: { recipeId, userId } });
    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Recipe not found or unauthorized" });
    }

    await recipe.destroy();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting recipe", error: err.message });
  }
};

// controllers/recipeController.js
const browseRecipes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows: recipes } = await Recipe.findAndCountAll({
      limit: parseInt(limit),
      offset: offset,
      include: [{ model: User, attributes: ["username"] }], // Include user details
    });

    const totalPages = Math.ceil(count / limit);

    // Check if the requested page exceeds the total number of pages
    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not found",
        totalRecipes: count,
        totalPages,
        currentPage: parseInt(page),
      });
    }

    res.status(200).json({
      recipes,
      totalRecipes: count,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching recipes", error: err.message });
  }
};

const searchRecipes = async (req, res) => {
  const { q, ingredients, category } = req.query;

  try {
    const whereClause = {};

    // Search by title (q)
    if (q) {
      whereClause.title = { [Op.like]: `%${q}%` };
    }

    // Search by ingredients
    if (ingredients) {
      const ingredientsList = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
      whereClause.ingredients = {
        [Op.and]: ingredientsList.map((ingredient) => ({
          [Op.like]: `%${ingredient}%`,
        })),
      };
    }

    // Search by category
    if (category) {
      whereClause.dietaryPreferences = { [Op.like]: `%${category}%` };
    }

    const recipes = await Recipe.findAll({
      where: whereClause,
      include: [{ model: User, attributes: ["username"] }],
    });

    res.status(200).json({ recipes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error searching recipes", error: err.message });
  }
};

const filterRecipes = async (req, res) => {
  const { dietaryPreferences, difficultyLevel, maxCookingTime } = req.query;

  try {
    const whereClause = {};
    if (dietaryPreferences) {
      whereClause.dietaryPreferences = { [Op.like]: `%${dietaryPreferences}%` };
    }
    if (difficultyLevel) {
      whereClause.difficultyLevel = difficultyLevel;
    }
    if (maxCookingTime) {
      whereClause.cookingTime = { [Op.lte]: parseInt(maxCookingTime) };
    }

    const recipes = await Recipe.findAll({
      where: whereClause,
      include: [{ model: User, attributes: ["username"] }],
    });

    res.status(200).json({ recipes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error filtering recipes", error: err.message });
  }
};

module.exports = {
  createRecipe,
  editRecipe,
  deleteRecipe,
  browseRecipes,
  searchRecipes,
  filterRecipes,
};
