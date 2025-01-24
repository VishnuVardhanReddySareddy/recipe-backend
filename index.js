// index.js
const express = require("express");
const sequelize = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import models
const User = require("./models/User");
const Recipe = require("./models/Recipe");
const Favorite = require("./models/Favorite");
const Collection = require("./models/Collection");
const CollectionRecipe = require("./models/CollectionRecipe");
const Rating = require("./models/Rating");
const Review = require("./models/Review");
const Follow = require("./models/Follow");

// Import routes
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const followRoutes = require("./routes/followRoutes");
const activityFeedRoutes = require("./routes/activityFeedRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const adminRecipeRoutes = require("./routes/adminRecipeRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Define model associations

// User and Recipe (One-to-Many)
User.hasMany(Recipe, { foreignKey: "userId" });
Recipe.belongsTo(User, { foreignKey: "userId" });

// User and Favorite (One-to-Many)
User.hasMany(Favorite, { foreignKey: "userId" });
Favorite.belongsTo(User, { foreignKey: "userId" });

// Recipe and Favorite (One-to-Many)
Recipe.hasMany(Favorite, { foreignKey: "recipeId" });
Favorite.belongsTo(Recipe, { foreignKey: "recipeId" });

// User and Collection (One-to-Many)
User.hasMany(Collection, { foreignKey: "userId" });
Collection.belongsTo(User, { foreignKey: "userId" });

// Collection and Recipe (Many-to-Many)
Collection.belongsToMany(Recipe, {
  through: CollectionRecipe,
  foreignKey: "collectionId",
});
Recipe.belongsToMany(Collection, {
  through: CollectionRecipe,
  foreignKey: "recipeId",
});

// User and Rating (One-to-Many)
User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

// Recipe and Rating (One-to-Many)
Recipe.hasMany(Rating, { foreignKey: "recipeId" });
Rating.belongsTo(Recipe, { foreignKey: "recipeId" });

// User and Review (One-to-Many)
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

// Recipe and Review (One-to-Many)
Recipe.hasMany(Review, { foreignKey: "recipeId" });
Review.belongsTo(Recipe, { foreignKey: "recipeId" });

User.belongsToMany(User, {
  through: Follow,
  as: "Followers",
  foreignKey: "followingId",
  otherKey: "followerId",
});

User.belongsToMany(User, {
  through: Follow,
  as: "Following",
  foreignKey: "followerId",
  otherKey: "followingId",
});

// Sync models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Models synced with database.");
  })
  .catch((err) => {
    console.error("Unable to sync models:", err);
  });

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/recipes", recipeRoutes); // Recipe management routes
app.use("/favorites", favoriteRoutes); // Favorites routes
app.use("/collections", collectionRoutes); // Collections routes
app.use("/ratings", ratingRoutes); // Rating routes
app.use("/reviews", reviewRoutes); // Review routes
app.use("/follow", followRoutes);
app.use("/activity-feed", activityFeedRoutes);
app.use("/admin/users", adminUserRoutes);
app.use("/admin/recipes", adminRecipeRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Management and Sharing Platform API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
