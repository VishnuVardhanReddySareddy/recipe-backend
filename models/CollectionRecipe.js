// models/CollectionRecipe.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CollectionRecipe = sequelize.define("CollectionRecipe", {
  collectionRecipeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  collectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Collections",
      key: "collectionId",
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

module.exports = CollectionRecipe;
