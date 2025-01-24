// routes/collectionRoutes.js
const express = require("express");
const {
  createCollection,
  addRecipeToCollection,
} = require("../controllers/collectionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect routes with authentication middleware
router.use(authMiddleware);

// Create a new collection
router.post("/", createCollection);

// Add a recipe to a collection
router.post("/add-recipe", addRecipeToCollection);

module.exports = router;
