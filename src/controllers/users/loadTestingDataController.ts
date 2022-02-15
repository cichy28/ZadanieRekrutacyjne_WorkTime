import { Request, Response } from "express";
import { CommandRequest } from "../../types/routes.types";
import commandModel from "../../models/commands";
import { isCommand, command } from "../../models/commands";
import { isArray } from "lodash";

const loadTestingData = async (req: Request, res: Response): Promise<Response> => {
	const message = await loadData(req.body);
	res.status(400).send(message.message);
	if (message.valid) res.status(200);
	return res;
};

async function loadData(data: command[]) {
	const result = { valid: false, message: "" };
	if (!isArray(data)) {
		result.message = "Its not an array";
		return result;
	}
	for (const element of data) {
		if (!isCommand(element)) {
			result.message = `Incorrect object - ${JSON.stringify(element)}`;
			return result;
		}
	}
	for (const element of data) {
		let newRecord = new commandModel(element);
		await newRecord.save();
	}
	result.message = `Data uploaded correctly`;
	result.valid = true;
	return result;
}

export { loadData };
export default loadTestingData;
