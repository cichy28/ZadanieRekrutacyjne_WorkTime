import { raw, Request, Response } from "express";
import { ICommand, ICommandBaseDocument, CommandModel, isCommand } from "@models/recruitmentTask1/commands";
import { isArray } from "lodash";

export async function loadTestingData(req: Request, res: Response): Promise<Response> {
	const result = await loadData(req.body);
	res.status(400).send(result.message);
	if (result.valid) res.status(200);
	return res;
}

export async function loadData(data: ICommand[]) {
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
		let newRecord = new CommandModel(element);
		await newRecord.save();
	}
	result.message = `Data uploaded correctly`;
	result.valid = true;
	return result;
}
