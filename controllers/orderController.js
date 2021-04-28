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

    const order = new Order({

        items : items
        
    })

    const deletedOrder = await order.delete()

    res.status(201).json(deletedOrder)
})

const getOrders = asyncHandler((req,res) => {

    // Can you give me a hint on how this function works?
    //like what does it return?s
})