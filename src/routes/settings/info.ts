import express, { Router, Application, Request, Response } from "express";
import { resourceLimits } from "worker_threads";
import { TypedRequestBody, CommandRequest } from "../../app_model";
import * as fs from "fs";

const routes = express.Router({ mergeParams: true });

// Create user
routes.post("/:userId", async (req: TypedRequestBody<{ userId: string }>, res: Response): Promise<Response> => {
	try {
		const fileHandeler = await fs.promises.open(`./user_data/${req.params.userId}`, "a+");
		fileHandeler.close();
		return res.status(200).send({
			message: "File created",
		});
	} catch (error) {
		return res.status(400).send({
			message: "There was an error:" + error,
		});
	}
});

module.exports = routes;
