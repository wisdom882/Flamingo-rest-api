//add order

//get order by id

//get orders

//delete order

import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel'

const createOrder = async (items) =>{
  const order = new Order({

    items : items,
    user: req.user_id
  })
  const newOrder = await order.save()
  return newOrder
}
const addOrder = asyncHandler(async(req, res) => {

    console.log(req.body)
    const { items } = req.body

    if(items && items.length === 0)
    {
        res.status(400)
        throw new Error('no items in order')   
    }
    createOrder(items)
    res.status(201).json(newOrder)

})

const deleteOrder = asyncHandler((res, req) => {
  
    console.log(req.body)

    const order = await Order.findById(req.params.id);
  
    if (order) {
      order.delete();
      res.json({message:"order successfully deleted"})
    } else {
      res.status(404);
      throw new Error("order not found");
    }
})

const getOrders = asyncHandler((req,res) => {

    const orders = await Order.find({}); //No need for parameter
    res.json(orders);
})

const getOrderById = asyncHandler((res,req) => {
    const order = await Order.findById(req.params.id);
  
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("order not found");
    }
})