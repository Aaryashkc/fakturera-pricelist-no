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

export const createPrice = async (req, res) => {
  try {
    const { articleNo, productService, inPrice, price, unit, inStock, description } = req.body;

    const newPrice = await PriceList.create({
      articleNo,
      productService,
      inPrice,
      price,
      unit,
      inStock,
      description
    });

    res.status(201).json({
      success: true,
      data: newPrice
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};