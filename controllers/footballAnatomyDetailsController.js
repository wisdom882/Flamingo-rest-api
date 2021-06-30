import asyncHandler from 'express-async-handler'
import footballAnatomyDetails from '../models/footballAnatomyDetailsModel.js'
import {itemsType} from '../constants/constant.js'

//add
//delete
//getAll
//getByID

const getItemsType = asyncHandler(async(req,res)=>{
    if(itemsType){

        res.json(itemsType)
    }
    else
    {
        res.status(400)
        throw new Error("type not found")
    }
})

const createFootballItem = async (footballItems) => {
    const footballItem = new footballAnatomyDetails({
        ...footballItems
    })

    const newFootballItem = await footballItem.save()
    return newFootballItem
}

const addFootballItem = asyncHandler(async(req,res) =>{
    const { title,description,imageUrl,itemType } = req.body
    const footballItemExists = await footballAnatomyDetails.findOne({title: title})

    if (footballItemExists) {
        res.status(400);
        throw new Error("football item already exists")
    }

    const footballItem = await footballAnatomyDetails.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        itemType: itemType,
        status: true,
        dateCreated: Date.now()
    })

    if(footballItem) {
        res.status(201).json({
            _id: footballItem.id,
            title: footballItem.title,
            description:footballItem.description,
            imageUrl: footballItem.imageUrl
        })

    } else{
        res.status(400)
        throw new Error("Could not create football item");
    }
})

const deleteFootballItems = asyncHandler(async(res, req) => {
  
    console.log(req.body)

    const footballItem = await footballAnatomyDetails.findById(req.params.id);
  
    if (footballItem) {
      status = 0;
    } else {
      res.status(404);
      throw new Error("football item not found");
    }
})

const getAllFootball = asyncHandler(async(req,res) =>{
    const footballitems = await footballAnatomyDetails.find({}); //No need for parameter
    res.json(footballitems);
})

const getFootballByID = asyncHandler(async(res,req) => {
    const footballitem = await footballAnatomyDetails.findById(req.params.id);
  
    if (footballitem) {
      res.json(footballitem);
    } else {
      res.status(404);
      throw new Error("item not found");
    }
})

export {createFootballItem , addFootballItem, deleteFootballItems, getAllFootball, getFootballByID, getItemsType}