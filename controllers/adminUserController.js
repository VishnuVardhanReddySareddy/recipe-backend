// controllers/adminUserController.js
const User = require("../models/User");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["userId", "username", "email", "isAdmin", "isBanned"],
    });

    res.status(200).json({ users });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

// Ban a user
const banUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ isBanned: true });
    res.status(200).json({ message: "User banned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error banning user", error: err.message });
  }
};

// Unban a user
const unbanUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ isBanned: false });
    res.status(200).json({ message: "User unbanned successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error unbanning user", error: err.message });
  }
};

module.exports = { getAllUsers, banUser, unbanUser };
