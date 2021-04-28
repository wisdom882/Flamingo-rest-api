//add order

//get order by id

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

    await order.save()

})