import express from "express";
import { renderUserData } from "@src/controllers/recruitmentTask1/renderUserDataController";

export const routes = express.Router({ mergeParams: true });
routes.get("/", renderUserData);
