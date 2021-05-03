import express from "express";
import {
    addOrders,
    getOrder,
    getOrderById,
    deleteOrder
} from '../controllers/orderController.js'

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrders);

router
  .route("/:id")
  .get(protect, getOrderById)
  .get(protect, getOrder)
  .delete(protect, deleteOrder);

export default router;
