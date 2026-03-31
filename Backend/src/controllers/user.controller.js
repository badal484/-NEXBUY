import User from "../models/user.model.js";

export const becomeSeller = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { role: "seller" },
    { new: true }
  );

  res.json(user); 
};

