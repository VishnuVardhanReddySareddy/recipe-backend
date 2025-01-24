// controllers/followController.js
const Follow = require("../models/Follow");
const User = require("../models/User");

// Follow a user
const followUser = async (req, res) => {
  const { followingId } = req.body;
  const followerId = req.user.userId;

  try {
    // Check if the user is trying to follow themselves
    if (followerId === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Check if the user is already being followed
    const existingFollow = await Follow.findOne({
      where: { followerId, followingId },
    });
    if (existingFollow) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    // Create the follow relationship
    await Follow.create({ followerId, followingId });
    res.status(201).json({ message: "User followed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error following user", error: err.message });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  const { followingId } = req.params;
  const followerId = req.user.userId;

  try {
    const follow = await Follow.findOne({ where: { followerId, followingId } });
    if (!follow) {
      return res
        .status(404)
        .json({ message: "You are not following this user" });
    }

    await follow.destroy();
    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error unfollowing user", error: err.message });
  }
};

// Get followers of a user
const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: User, as: "Followers", attributes: ["userId", "username"] },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ followers: user.Followers });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching followers", error: err.message });
  }
};

// Get users followed by a user
const getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: User, as: "Following", attributes: ["userId", "username"] },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ following: user.Following });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching following", error: err.message });
  }
};

module.exports = { followUser, unfollowUser, getFollowers, getFollowing };
