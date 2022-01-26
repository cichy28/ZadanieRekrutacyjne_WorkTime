import express, { Router, Application, Request, Response } from "express";
import { CommandRequest } from "../../app_model";
import commandModel from "../../mongoDb/model/users";

const routes = express.Router({ mergeParams: true });

routes.post("/:userId", async (req: CommandRequest, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};
	const newRecord = new commandModel({
		name: req.params.userId,
		command: "startUser",
		description: req.body.description,
	});
	const lastRecord = await commandModel.findOne({ name: req.params.userId }).sort({ createdAt: "desc" });

	if (lastRecord === null || lastRecord.command === "stopUser") {
		responseObject.dbResponse = await newRecord.save();
		responseObject.message = `User ${req.params.userId} started`;
		return res.status(200).send(responseObject);
	}

	if (lastRecord.command === "startUser") {
		responseObject.message = `User ${req.params.userId} already started`;
		return res.status(406).send(responseObject);
	}

	return res.status(406).send(responseObject);
});

module.exports = routes;

/**
 * @swagger
 * /users/startUser/{userId}:
 *   post:
 *     summary: Start.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrription of task.
 *                 example: Coding...
 *     responses:
 *       200:
 *         description: Started.
 */
