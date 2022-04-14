import express from "express";
import { sendReport } from "@src/controllers//energyCounter/sendReport";

const sendReportRoute = express.Router({ mergeParams: true });
sendReportRoute.post("/", sendReport);
module.exports = sendReportRoute;
