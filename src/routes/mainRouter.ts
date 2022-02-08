import express, { Router, Application, Request, Response } from "express";

import { TypedRequestBody, CommandRequest } from "../types/routes.types";

const mainRouter = express.Router({ mergeParams: true });

const getUserData = require("./users/getUserData");
const renderUserData = require("./users/renderUserData");
const loadTestingData = require("./users/loadTestingData");
const setUserData = require("./users/setUserData");

// Endppoints
mainRouter.use("/users/getUserData", getUserData);
mainRouter.use("/users/renderUserData", renderUserData);
mainRouter.use("/users/loadTestingData", loadTestingData);
mainRouter.use("/users/setUserData", setUserData);

mainRouter.get("/", (req, res) => {
	res.render("main", { title: "Main paige", buttons: true });
});

mainRouter.use("", (req, res) => {
	console.log("No enpoint like this");
	res.sendStatus(404);
});

module.exports = mainRouter;
