import express, { Router, Application, Request, Response } from "express";
import morgan from "morgan";
import { TypedRequestBody, CommandRequest } from "../types/routes.types";

const mainRouter = express.Router({ mergeParams: true });

const startUser = require("./users/startUser");
const stopUser = require("./users/stopUser");
const getUserData = require("./users/getUserData");

// Logger
mainRouter.use(morgan("dev"));
mainRouter.use(express.static("public"));
mainRouter.use("/users/startUser", startUser);
mainRouter.use("/users/stopUser", stopUser);
mainRouter.use("/users/getUserData", getUserData);

mainRouter.get("/", (req, res) => {
	res.render("main", { title: "Main paige", buttons: true });
});

mainRouter.use("", (req, res) => {
	res.send(404);
});

module.exports = mainRouter;
