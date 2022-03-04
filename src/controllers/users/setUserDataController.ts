import { Request, Response } from "express";
import { CommandRequest } from "@src/types/routes.types";
import { ICommand, ICommandBaseDocument, commandModel, isCommand } from "@models/commands";

interface responseObject {
	valid: boolean;
	message: string;
}

export async function setUserData(req: CommandRequest, res: Response): Promise<Response> {
	if (!isCommand(req.body))
		return res
			.send(`Incorrect object - ${JSON.stringify(req.body)} details: ${JSON.stringify(isCommand.errors)}`)
			.status(400);
	let response = {
		valid: false,
		message: "Invalid data",
	};
	if (req.body.command === "startUser") response = await startUser(req.body);
	if (req.body.command === "stopUser") response = await stopUser(req.body);
	return res
		.status(406)
		.status(response.valid ? 200 : 400)
		.send(response.message);
}

const startUser = async (data: ICommand): Promise<responseObject> => {
	let response = {
		valid: false,
		message: "Invalid data",
	};
	const newRecord = createDocument(data);
	const lastRecord = await commandModel.findOne({ userId: data.userId }).sort({ createdAt: "desc" });

	if (lastRecord === null || lastRecord.command === "stopUser") {
		await newRecord.save();
		response.valid = true;
		response.message = `User ${data.userId} started`;
		return response;
	}

	if (lastRecord.command === "startUser") {
		response.message = `User ${data.userId} already started`;
		return response;
	}
	return response;
};

const stopUser = async (data: ICommand): Promise<responseObject> => {
	let responseObject = {
		valid: false,
		message: "Invalid data",
	};
	const newRecord = createDocument(data);
	const lastRecord = await commandModel.findOne({ userId: data.userId }).sort({ createdAt: "desc" });

	if (lastRecord === null || lastRecord.command === "stopUser") {
		responseObject.message = `User ${data.userId} is not started`;
		return responseObject;
	}

	if (lastRecord.command === "startUser") {
		await newRecord.save();
		responseObject.valid = true;
		responseObject.message = `User ${data.userId} stopped`;
		return responseObject;
	}
	return responseObject;
};

function createDocument(data: ICommand) {
	return new commandModel({
		userId: data.userId,
		command: data.command,
		description: data.description,
		timestamp: data.timestamp || new Date(),
	});
}
