import express from "express";
import renderUserData from "../../controllers/users/renderUserDataController";

const routes = express.Router({ mergeParams: true });
routes.get("/", renderUserData);
module.exports = routes;
