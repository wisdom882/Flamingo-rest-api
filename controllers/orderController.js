//add order

//get order by id

//get orders

//delete order

import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel'

const addOrder = asyncHandler(async(req, res) => {

    console.log(req.body)
    const { items } = req.body

    if(items && items.length === 0)
    {
        res.status(400)
        throw new Error('no items in order')   
    }

    const order = new Order({

        items : items,
        user: req.user_id
    })

    const newOrder = await order.save()

    res.status(201).json(newOrder)

})

const deleteOrder = asyncHandler((res, req) => {
  
    console.log(req.body)

    //check if cart is empty or invalid
    if(items && items.length === 0)
    {
        res.status(400)
        throw new Error('no items in order')   
    }

    const order = await Order.findById(req.params.id);
  
    if (order) {
      order.delete();
    } else {
      res.status(404);
      throw new Error("User not found");
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
      throw new Error("User not found");
    }
})