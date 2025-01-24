// models/Rating.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Rating = sequelize.define("Rating", {
  ratingId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "userId",
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Recipes",
      key: "recipeId",
    },
  },
});

module.exports = Rating;
