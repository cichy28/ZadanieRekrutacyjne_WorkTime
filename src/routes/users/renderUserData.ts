import express from "express";
import { renderUserData } from "@src/controllers/users/renderUserDataController";

export const routes = express.Router({ mergeParams: true });
routes.get("/", renderUserData);
