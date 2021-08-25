import express from "express";
import Multer from "multer";

import { protect } from "../middleware/authMiddleware.js";
import uploadFile from "../controllers/fileUploadController.js";

const router = express.Router();
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.route("/").post(multer.single("file"), uploadFile);

export default router;
