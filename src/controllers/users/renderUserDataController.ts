import { raw, Request, Response } from "express";
import { prepareChartData } from "@src/controllers/users/getUserDataController";
import { commandModel } from "@models/commands";
// A moze to jakos da sie zrobić w 1 pliku ??? - TO DO

export async function renderUserData(req: Request, res: Response): Promise<Response> {
	if (req.query.userId === undefined) return res.status(400).send("userId not found");
	const userCommands = await commandModel.findAllCommandsFromUser(String(req.query.userId));
	const chartData = await prepareChartData(userCommands);
	if (chartData === null) res.send("No data available").status(400);
	res.render("chart", { title: "Main paige", chartData: chartData, buttons: true });
	return res;
}
