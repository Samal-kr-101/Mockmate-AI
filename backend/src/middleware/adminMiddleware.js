import User from "../models/User.js";

const adminMiddleware = async (
  req,
  res,
  next
) => {

  const user =
    await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      message: "Admin only route"
    });
  }

  next();
};

export default adminMiddleware;