import express, { Router, Application, Request, Response } from "express";
import { resourceLimits } from "worker_threads";
import { TypedRequestBody, CommandRequest } from "../../app_model";
import * as fs from "fs";

const routes = express.Router({ mergeParams: true });

// Delete user
routes.delete("/:userId", async (req: TypedRequestBody<{ userId: string }>, res: Response): Promise<Response> => {
	try {
		await fs.promises.unlink(`./user_data/${req.params.userId}`);
		await fs.promises.unlink(`./user_data/${req.params.userId}_chart`);
		return res.status(200).send({
			message: "File deleted",
		});
	} catch (error) {
		return res.status(400).send({
			message: "There was an error:" + error,
		});
	}
});

module.exports = routes;

/**
 * @swagger
 * /users/deleteUser/{userId}:
 *   post:
 *     summary: Create the user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted sucsessfully.
 */
