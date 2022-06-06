"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sendReport_1 = require("@src/controllers//energyCounter/sendReport");
var sendReportRoute = express_1.default.Router({ mergeParams: true });
sendReportRoute.post("/", sendReport_1.sendReport);
module.exports = sendReportRoute;
