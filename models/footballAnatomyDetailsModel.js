import mongoose from 'mongoose'

const footballAnatomyDetailsSchema = mongoose.Schema({
        title:{
            type: String,
            required: true,
        },
    
        description:{
            type: String,
            required: true,
        },
    
        imageUrl:{
            type: String,
            required: true,
        },

        ItemType:{
            type: String,
            required: true,
        },

        dateCreated:{
            type: Date,
            required: true,
        },
    
        dateDeleted:{
            type:{
                type: Date,
            }
        },

        status:{
            type: Boolean,
            required: true,
        },
   
    

    //changeColorOfSignIn
    //controller
    //separartepage for admin
    //deleteStatus 0 to 1
})

const footballAnatomyDetails = mongoose.model('footballAnatomyDetails', footballAnatomyDetailsSchema)
export default footballAnatomyDetails;