import { Request, Response } from "express";
import { CommandRequest } from "../../types/routes.types";
import commandModel from "../../models/users";

const startUser = async (req: CommandRequest, res: Response): Promise<Response> => {
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
};
export default startUser;
