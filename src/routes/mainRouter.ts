import express, { Router, Application, Request, Response } from "express";
import { TypedRequestBody, CommandRequest } from "../app_model";

const mainRouter = express.Router({ mergeParams: true });

const startUser = require("./users/startUser");
const stopUser = require("./users/stopUser");
const getUserData = require("./users/getUserData");

const info = require("./settings/info");

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

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: mainRouter.
 *     description: mainRouter.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of user.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
