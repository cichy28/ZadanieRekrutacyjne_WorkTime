import { Request, Response } from "express";
import { CommandRequest } from "../../types/routes.types";
import commandModel from "../../models/users";

const stopUser = async (req: CommandRequest, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};
	const newRecord = new commandModel({
		name: req.params.userId,
		command: "stopUser",
		description: req.body.description,
	});
	const lastRecord = await commandModel.findOne({ name: req.params.userId }).sort({ createdAt: "desc" });

	if (lastRecord === null || lastRecord.command === "stopUser") {
		responseObject.message = `User ${req.params.userId} is not started`;
		return res.status(406).send(responseObject);
	}

	if (lastRecord.command === "startUser") {
		responseObject.dbResponse = await newRecord.save();
		responseObject.message = `User ${req.params.userId} stopped`;
		return res.status(200).send(responseObject);
	}

	return res.status(406).send(responseObject);
};
export default stopUser;
