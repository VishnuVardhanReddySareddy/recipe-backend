// models/Recipe.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Recipe = sequelize.define("Recipe", {
  recipeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cookingTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dietaryPreferences: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  difficultyLevel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Recipe;
