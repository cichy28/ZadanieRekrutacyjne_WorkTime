import { raw, Request, Response } from "express";
import { ICommand, ICommandBaseDocument, CommandModel } from "@models/commands";

export const getUserData = async function (req: Request, res: Response): Promise<Response> {
	if (req.query.userId === undefined) return res.status(400).send("userId not found");
	const userCommands = await CommandModel.findAllDocumentsFromUser(String(req.query.userId));
	const chartData = CommandModel.parseCommandsToActivityTime(userCommands);
	if (chartData === null) res.send("No data available").status(400);
	return res.status(200).send(chartData);
};
