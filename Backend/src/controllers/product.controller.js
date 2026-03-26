import Product from "../models/product.model.js";
import Shop from "../models/shop.model.js";
import imagekit from "../config/imagekit.js";

export const addProduct = async (req, res) => {
  try {
    const { title, price, lng, lat } = req.body;

    if (!title || !price || !lng || !lat) {
      return res.status(400).json({ msg: "All fields are required" });
    }


    const parsedLng = parseFloat(lng);
    const parsedLat = parseFloat(lat);
    const parsedPrice = parseInt(price);

    if (isNaN(parsedLng) || isNaN(parsedLat) || isNaN(parsedPrice)) {
      return res.status(400).json({ msg: "Invalid numeric values" });
    }

    const shop = await Shop.findOne({ owner: req.user.id });

    if (!shop) {
      return res.status(400).json({ msg: "Create shop first" });
    }

    let imageUrls = [];

    if (req.file) {
        const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });

      imageUrls.push(result.url);
    }

    const product = await Product.create({
      title,
      price: parsedPrice,
      seller: req.user.id,
      shop: shop._id,
      images: imageUrls,
      location: {
        type: "Point",
        coordinates: [parsedLng, parsedLat],
      },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getNearbyProducts = async (req, res) => {
  try {
    const {lng,lat,minPrice,maxPrice, distance = 5000,} = req.query;


    if (!lng || !lat) {
      return res.status(400).json({ msg: "Location is required" });
    }

    const parsedLng = parseFloat(lng);
    const parsedLat = parseFloat(lat);
    const parsedDistance = parseInt(distance);

    if (isNaN(parsedLng) || isNaN(parsedLat)) {
      return res.status(400).json({ msg: "Invalid coordinates" });
    }

    const query = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parsedLng, parsedLat],
          },
          $maxDistance: parsedDistance,
        },
      },
    };

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    const products = await Product.find(query)
      .populate("shop", "name address")
      .populate("seller", "name email")
      .sort({ createdAt: -1 }); 

    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};