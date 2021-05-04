import express from "express";
import {
    addOrders,
    getOrders,
    getOrderById,
    deleteOrder,
} from '../controllers/orderController.js'

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect,addOrders);
router.route("/").get(protect, getOrders);

router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, deleteOrder);

export default router;
