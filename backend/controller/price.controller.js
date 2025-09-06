import { PriceList } from "../models/price.model.js";

export const getAllPrices = async (req, res) => {
  try {
    const prices = await PriceList.findAll();
    res.status(200).json(prices);
  } catch (err) {
    console.error("Error fetching prices:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPriceItem = async (req, res) => {
  try {
    const { articleNo, productService, inPrice, price, unit, inStock, description } = req.body;

    const newItem = await PriceList.create({
      articleNo,
      productService,
      inPrice,
      price,
      unit,
      inStock,
      description,
    });

    res.status(201).json({
      message: "Price item created successfully",
      data: newItem,
    });
  } catch (error) {
    console.error("Error creating price item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};