import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { Rooms } from "./src/models/Rooms.models.js";
import { connectDB } from "./src/db/connectDB.js";
import cors from "cors";
import roomRouter from "./src/routes/room.routes.js";
import userRouter from "./src/routes/user.routes.js";
import sellerRouter from "./src/routes/seller.routes.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import reviewRouter from "./src/routes/review.routes.js";

dotenv.config();

connectDB();

cloudinary.config({
  api_key: process.env.api_key,
  cloud_name: process.env.cloud_name,
  api_secret: process.env.api_secret,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/room", roomRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/review", reviewRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});
