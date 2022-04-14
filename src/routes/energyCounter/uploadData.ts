import express from "express";
import { uploadData } from "@src/controllers//energyCounter/uploadData";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const uploadDataRoute = express.Router({ mergeParams: true });
uploadDataRoute.post("/", upload.single("uploadData"), uploadData);
module.exports = uploadDataRoute;
