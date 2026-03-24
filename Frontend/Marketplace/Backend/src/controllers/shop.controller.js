import Shop from "../models/shop.model.js";

// ✅ Create Shop
export const createShop = async (req, res) => {
  try {
    const { name, address, lng, lat } = req.body;

    // ✅ Check if shop already exists
    const existingShop = await Shop.findOne({ owner: req.user.id });

    if (existingShop) {
      return res.status(400).json({ msg: "You already have a shop" });
    }

    const shop = await Shop.create({
      name,
      address,
      owner: req.user.id,
      location: {
        type: "Point",
        coordinates: [lng, lat]
      }
    });

    res.json(shop);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get My Shop
export const getMyShop = async (req, res) => {
  const shop = await Shop.findOne({ owner: req.user.id });

  if (!shop) {
    return res.status(404).json({ msg: "No shop found" });
  }

  res.json(shop);
};
