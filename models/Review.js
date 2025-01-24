// models/Review.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = sequelize.define("Review", {
  reviewId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
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

module.exports = Review;
