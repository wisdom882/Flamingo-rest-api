import express from "express";

import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";

//Route Imports
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import setupProdMiddleware from './config/prod.js'

dotenv.config();
connectDB();

const app = express();
setupProdMiddleware(app);

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);


const port = process.env.PORT || 8030
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
