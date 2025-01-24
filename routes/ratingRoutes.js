// routes/ratingRoutes.js
const express = require("express");
const { rateRecipe } = require("../controllers/ratingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect routes with authentication middleware
router.use(authMiddleware);

// Rate a recipe
router.post("/", rateRecipe);

module.exports = router;
