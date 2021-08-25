import mongoose from 'mongoose'

const footballAnatomyDetailsSchema = mongoose.Schema({
        title:{
            type: String,
            required: true,
            unique: true,
        },
    
        description:{
            type: String,
            required: true,
        },
    
        imageUrl:{
            type: String,
            required: true,
        },

        itemType:{
            type: String,
            required: true,
        },

        dateCreated:{
            type: Date,
            required: true,
        },
    
        dateDeleted:{
           type: Date,
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

const FootballAnatomyDetails = mongoose.model('footballAnatomyDetails', footballAnatomyDetailsSchema)
export default FootballAnatomyDetails;