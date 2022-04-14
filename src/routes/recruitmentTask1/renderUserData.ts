import express from "express";
import { renderUserData } from "@src/controllers/recruitmentTask1/renderUserDataController";

const renderUserDataRoute = express.Router({ mergeParams: true });
renderUserDataRoute.get("/", renderUserData);
module.exports = renderUserDataRoute;
