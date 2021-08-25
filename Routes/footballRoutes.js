import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  getItemsType,
  createFootballItem,
  addFootballItem,
  deleteFootballItems,
  getAllFootball,
  getFootballByID,
} from "../controllers/footballAnatomyDetailsController.js";

import FileUpload from "../controllers/fileUploadController.js";

const router = express.Router();

router.route("/fileUpload").post(FileUpload);
router.route("/").get(protectAdmin, getAllFootball);
router.route("/addFootballItem").post(protectAdmin, addFootballItem);
router
  .route("/:id")
  //.get(protect, getItemsType)
  .get(protectAdmin, getFootballByID)
  .delete(protectAdmin, deleteFootballItems);

export default router;
