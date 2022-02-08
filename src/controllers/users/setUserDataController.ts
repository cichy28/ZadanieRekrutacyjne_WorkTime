import { Request, Response } from "express";
import { CommandRequest } from "../../types/routes.types";
import commandModel from "../../models/commands";
import { isCommand, command } from "../../models/commands";

const setUserData = async (req: CommandRequest, res: Response): Promise<Response> => {
	if (req.body.timestamp === undefined) {
		req.body.timestamp = new Date().toUTCString();
	}
	if (!isCommand(req.body))
		return res
			.send(`Incorrect object - ${JSON.stringify(req.body)} details: ${JSON.stringify(isCommand.errors)}`)
			.status(400);
	if (req.body.command === "startUser") return startUser(req, res);
	if (req.body.command === "stopUser") return stopUser(req, res);
	return res.status(406).send("Incorrect command");
};

const startUser = async (req: CommandRequest, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};
	const newRecord = new commandModel({
		userId: req.body.userId,
		command: req.body.command,
		description: req.body.description,
		timestamp: Date(),
	});
	const lastRecord = await commandModel.findOne({ userId: req.body.userId }).sort({ createdAt: "desc" });

	if (lastRecord === null || lastRecord.command === "stopUser") {
		responseObject.dbResponse = await newRecord.save();
		responseObject.message = `User ${req.body.userId} started`;
		return res.status(200).send(responseObject);
	}

	if (lastRecord.command === "startUser") {
		responseObject.message = `User ${req.body.userId} already started`;
		return res.status(406).send(responseObject);
	}

	return res.status(406).send(responseObject);
};

const stopUser = async (req: CommandRequest, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};
	const newRecord = new commandModel({
		userId: req.body.userId,
		command: "stopUser",
		description: req.body.description,
		timestamp: Date(),
	});
	const lastRecord = await commandModel.findOne({ userId: req.body.userId }).sort({ createdAt: "desc" });

	if (lastRecord === null || lastRecord.command === "stopUser") {
		responseObject.message = `User ${req.body.userId} is not started`;
		return res.status(406).send(responseObject);
	}

	if (lastRecord.command === "startUser") {
		responseObject.dbResponse = await newRecord.save();
		responseObject.message = `User ${req.body.userId} stopped`;
		return res.status(200).send(responseObject);
	}

	return res.status(406).send(responseObject);
};
export default setUserData;
