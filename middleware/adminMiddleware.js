// middleware/adminMiddleware.js
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error verifying admin status", error: err.message });
  }
};

module.exports = adminMiddleware;
