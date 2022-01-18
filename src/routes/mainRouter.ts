import express, { Router, Application, Request, Response } from "express";
import { TypedRequestBody, CommandRequest } from "../app_model";

const mainRouter = express.Router({ mergeParams: true });

const createUser = require("./users/createUser");
const deleteUser = require("./users/deleteUser");
const startUser = require("./users/startUser");
const stopUser = require("./users/stopUser");
const getUserData = require("./users/getUserData");

const info = require("./settings/info");

mainRouter.use("/users/createUser", createUser);
mainRouter.use("/users/deleteUser", deleteUser);
mainRouter.use("/users/startUser", startUser);
mainRouter.use("/users/stopUser", stopUser);
mainRouter.use("/users/getUserData", getUserData);

mainRouter.use("settings/info", info);

mainRouter.get("/", async (req: TypedRequestBody<{ userId: string }>, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "Hello my friend!",
	});
});

module.exports = mainRouter;
