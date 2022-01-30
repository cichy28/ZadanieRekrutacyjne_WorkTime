import express, { Router, Application, Request, Response } from "express";

import { TypedRequestBody, CommandRequest } from "../types/routes.types";

const mainRouter = express.Router({ mergeParams: true });

const setUserData = require("./users/setUserData");
const getUserData = require("./users/getUserData");

// Endppoints
mainRouter.use("/users/setUserData", setUserData);
mainRouter.use("/users/getUserData", getUserData);

mainRouter.get("/", (req, res) => {
	res.render("main", { title: "Main paige", buttons: true });
});

mainRouter.use("", (req, res) => {
	console.log("No enpoint like this");
	res.sendStatus(404);
});

module.exports = mainRouter;
