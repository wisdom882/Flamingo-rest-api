import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },

    items: [{

        itemName: {
            type: String,
            required: true,
        },

        itemName: {
            type: String,
            required: true,
        },

        itemPrice: {
            type: Number,
            required: true,
        },
    },
    ],
})

const Order = mongoose.model('Order',orderSchema)
export default Order;