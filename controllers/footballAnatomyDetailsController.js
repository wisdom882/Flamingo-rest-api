import asyncHandler from "express-async-handler";
import FootballAnatomyDetails from "../models/footballAnatomyDetailsModel.js";
import { itemsType } from "../constants/constant.js";

//add
//delete
//getAll
//getByID

const getItemsType = asyncHandler(async (req, res) => {
  if (itemsType) {
    res.json(itemsType);
  } else {
    res.status(400);
    throw new Error("type not found");
  }
});

const createFootballItem = async (footballItems) => {
  const footballItem = new FootballAnatomyDetails({
    ...footballItems,
  });

  const newFootballItem = await footballItem.save();
  return newFootballItem;
};

const addFootballItem = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, itemType } = req.body;
  const footballItemExists = await FootballAnatomyDetails.findOne({
    title: title,
  });

  if (footballItemExists) {
    res.status(400);
    throw new Error("football item already exists");
  }

  const footballItem = await FootballAnatomyDetails.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    itemType: itemType,
    status: true,
    dateCreated: Date.now(),
    dateDeleted: null,
  });
  
  if (footballItem) {
    res.status(201).json({
      _id: footballItem.id,
      title: footballItem.title,
      description: footballItem.description,
      imageUrl: footballItem.imageUrl,
      status: footballItem.status,
      dateCreated: footballItem.dateCreated,
      dateDeleted: footballItem.dateDeleted,
    });
  } else {
    res.status(400);
    throw new Error("Could not create football item");
  }
});

const deleteFootballItems = asyncHandler(async (req, res) => {
  console.log(req.body);

  const footballItem = await FootballAnatomyDetails.findById(req.params.id);

  if (footballItem) {
    footballItem.status = false;
    footballItem.dateDeleted = Date.now();
    const updatedFootballItem = await footballItem.save();
    res.json(updatedFootballItem);
  } else {
    res.status(404);
    throw new Error("football item not found");
  }
});

const getAllFootball = asyncHandler(async (req, res) => {
  const footballitems = await FootballAnatomyDetails.find({ status: true }); //No need for parameter
  res.json(footballitems);
});

const getFootballByID = asyncHandler(async (req, res) => {
  const footballItem = await FootballAnatomyDetails.findById(req.params.id);

  if (footballItem) {
    res.json(footballItem);
  } else {
    res.status(404);
    throw new Error("item not found");
  }
});

export {
  createFootballItem,
  addFootballItem,
  deleteFootballItems,
  getAllFootball,
  getFootballByID,
  getItemsType,
};
