import { Request, Response } from "express";
import { CommandRequest } from "../../types/routes.types";
import commandModel from "../../models/users";
import { isCommand, command } from "../../models/users";
import { isArray } from "lodash";

const loadTestingData = async (req: Request, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};

	if (!isArray(req.body)) return res.send("Its not an array").status(400);
	for (const element of req.body) {
		if (!isCommand(element)) return res.send(`Incorrect object - ${JSON.stringify(element)}`).status(400);
	}
	for (const element of req.body) {
		let newRecord = new commandModel(element);
		await newRecord.save();
	}
	return res.status(200).send("Data uploaded correctly");
};

export default loadTestingData;
