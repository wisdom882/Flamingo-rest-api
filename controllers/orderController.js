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

const deleteOrder = asyncHandler(async(req,res) => {
    console.log(req.body)

    const orderToDelete = await Order.findById(req.params.id)

    if(orderToDelete)
    {
      orderToDelete.delete()
      res.status({message:"order successfully deleted"})
    }
    else{
      res.status(404)
      throw new Error("Order could not be deleted")
    }

})

const getOrders = asyncHandler(async(res,req) => {
  console.log(req.body)
  const orders = await Order.find({}) 
  res.json(orders)

})

const getOrderById = asyncHandler(async(res,req) => {
  console.log(req.body)
  const orderById = await Order.findById(req.params.id)

  if(orderById)
  {
    res.json(orderById)
  }
  else{
    res.status(404)
    throw new Error("Could not find order")
  }
})
export { addOrders, deleteOrder, getOrders, getOrderById };
