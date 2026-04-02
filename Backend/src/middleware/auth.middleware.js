import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "nexbuy-dev-secret";

export const protect = (req, res, next) => {        //its for checking valid login user
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "Invalid user" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;   //to send decoded as object req to next (controller)

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
