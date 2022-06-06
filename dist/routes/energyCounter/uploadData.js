"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var uploadData_1 = require("@src/controllers//energyCounter/uploadData");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
var uploadDataRoute = express_1.default.Router({ mergeParams: true });
uploadDataRoute.post("/", upload.single("uploadData"), uploadData_1.uploadData);
module.exports = uploadDataRoute;
