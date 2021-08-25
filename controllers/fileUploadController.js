import { Storage } from "@google-cloud/storage";
import asyncHandler from "express-async-handler";

const storage = new Storage({
  projectId: "arched-hybrid-321519",
  keyFilename:
    "C:/Users/bordu/OneDrive/Desktop/Flamingo-rest-api/config/arched-hybrid-321519-b07ebcf2d28d.json",
});

const bucket = storage.bucket("flamingoapp_wisdom");

const uploadFile = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    res.status(400).send("File not uploaded");
    return;
  }
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    console.log(publicUrl);
    res.status(200).json(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

export default uploadFile;
