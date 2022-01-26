import express, { Router, Application, Request, Response } from "express";
import commandModel from "../../mongoDb/model/users";
import * as _ from "lodash";

const routes = express.Router({ mergeParams: true });

// Get user data
routes.get("/:userId", async (req: Request, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};
	const rawData = await commandModel.find({ name: req.params.userId }).sort({ createdAt: "desc" });

	// Tu sth is not yes - można lepiej
	const agregatedData = [];
	for (let i = 0; i < rawData.length; i += 2) {
		let newElement = {};
		Object.assign(newElement, rawData[i]);
		newElement["TimeDiff"] = rawData[i].createdAt - rawData[i + 1].createdAt;
		agregatedData.push(newElement);
	}
	console.log(agregatedData);
	responseObject.dbResponse = rawData;
	responseObject.message = `Ta da`;
	return res.status(406).send(responseObject);
});

module.exports = routes;

/**
 * @swagger
 * /users/getUserData/{userId}:
 *   get:
 *     summary: Get data for chart.
 *     description: Take data about user activity..
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/Activity_time"
 */
