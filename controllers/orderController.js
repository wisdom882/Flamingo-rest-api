import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//Make an order
//Route - POST  /api/orders

const addOrders = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (items && items.length === 0) {
    res.status(400);
    throw new Error("No items in order");
  }

  const order = new Order({
    items: items,
    user: req.user._id,
  });

  const newOrder = await order.save();
  res.status(201).json(newOrder);
});

export { addOrders };
