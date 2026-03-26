
export const isSeller = (req, res, next) => {   //if he is a seller and want to create a shop then only true
  if (req.user.role !== "seller")
    return res.status(403).json({ msg: "Seller only" });

  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Admin only" });

  next();
};
