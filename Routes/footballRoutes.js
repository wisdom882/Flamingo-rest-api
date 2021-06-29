import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    getItemsType,
    createFootballItem,
    addFootballItem,
    deleteFootballItems,
    getAllFootball,
    getFootballByID,
} from "../controllers/footballAnatomyDetailsController.js"

const router = express.Router();


router.route("/createFootballItem").post(createFootballItem);
router.route("/addFootballItem").post(addFootballItem);
router
    .route("/:id")
    .get(protect, getItemsType)
    .get(protect, getAllFootball)
    .get(protect, getFootballByID)
    .delete(protect, deleteFootballItems);

export default router;