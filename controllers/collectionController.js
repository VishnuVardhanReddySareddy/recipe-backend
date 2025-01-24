// controllers/collectionController.js
const Collection = require("../models/Collection");
const CollectionRecipe = require("../models/CollectionRecipe");

// Create a new collection
const createCollection = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    const newCollection = await Collection.create({ name, userId });
    res
      .status(201)
      .json({
        message: "Collection created successfully",
        collectionId: newCollection.collectionId,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating collection", error: err.message });
  }
};

// Add a recipe to a collection
const addRecipeToCollection = async (req, res) => {
  const { collectionId, recipeId } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the collection belongs to the user
    const collection = await Collection.findOne({
      where: { collectionId, userId },
    });
    if (!collection) {
      return res
        .status(404)
        .json({ message: "Collection not found or unauthorized" });
    }

    // Add recipe to collection
    await CollectionRecipe.create({ collectionId, recipeId });
    res.status(201).json({ message: "Recipe added to collection" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error adding recipe to collection",
        error: err.message,
      });
  }
};

module.exports = { createCollection, addRecipeToCollection };
