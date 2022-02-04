import { Request, Response } from "express";
import { CommandRequest } from "../../types/routes.types";
import commandModel from "../../models/users";
import { command } from "../../models/users";

const loadTestingData = async (req: Request, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};

	let newRecord = new commandModel({
		name: req.body.name,
		command: "startUser",
		description: "test",
		timestamp: "",
	});

	for (const element of req.body) {
		Object.assign(newRecord, element);
		await newRecord.save();
	}
	return res.status(200).send("Ales gute?");
};

export default loadTestingData;
