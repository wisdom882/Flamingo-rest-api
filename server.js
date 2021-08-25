import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import connectDB from "./config/db.js";

//Route Imports
import userRoutes from "./routes/userRoutes.js";
import footballRoutes from "./routes/footballRoutes.js";
import utilityRoutes from "./routes/utilityRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/footballanatomy", footballRoutes);
app.use("/api/fileupload", utilityRoutes);
//app.use("/api/orders", orderRoutes);

app.listen(PORT, () => console.log(`server started on PORT  ${PORT}`));
