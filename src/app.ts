import * as _ from "lodash";
import * as fs from "fs";
import express, { Application, Request, Response } from "express";
const app: Application = express();
interface dataLog {
	userId: String;
	description: String;
	timestamp?: Date;
}

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "App is working - go /swagger/#/ for API doc",
	});
});

app.post("/users/:userId", async (req: Request, res: Response): Promise<Response> => {
	try {
		const fileHandeler = await fs.promises.open(`./user_data/${req.params.userId}`, "a+");
		fileHandeler.close();
		return res.status(200).send({
			message: "File created",
		});
	} catch (error) {
		return res.status(400).send({
			message: "There was an error:" + error,
		});
	}
});

app.delete("/users/:userId", async (req: Request, res: Response): Promise<Response> => {
	try {
		await fs.promises.unlink(`./user_data/${req.params.userId}`);
		return res.status(200).send({
			message: "File deleted",
		});
	} catch (error) {
		return res.status(400).send({
			message: "There was an error:" + error,
		});
	}
});

app.post("/users/:userId/:command/:description", async (req: Request, res: Response): Promise<Response> => {
	const timestamp = new Date().toISOString();
	const fileHandeler = await fs.promises.open(`./user_data/${req.params.userId}`, "a+");
	const fileBuffer = await fs.promises.readFile(fileHandeler);
	const file = fileBuffer.toString("utf-8").split("\n");
	if (file.length <= 1) {
		if (req.params.command === "start") {
			appendData(req);
			return res.status(200).send({
				message: `Counting started at ${timestamp} with description: ${req.params.description} `,
			});
		}
		if (req.params.command === "stop") {
			appendData(req);
			return res.status(200).send({
				message: `First send start command`,
			});
		}
	}
	file.pop();
	const lastRecord = file[file.length - 1].split(",");
	const [lastTimestamp, lastComand, lastDescription] = lastRecord;
	console.log(lastRecord);
	console.log(lastComand);
	if (lastComand === "stop" && req.params.command === "start") {
		appendData(req);
		return res.status(200).send({
			message: `Counting started at ${lastTimestamp} with description: ${req.params.description} `,
		});
	}
	if (lastComand === "start" && req.params.command === "stop") {
		appendData(req);
		return res.status(200).send({
			message: `Counting stopped at ${lastTimestamp} with description: ${req.params.description} `,
		});
	}
	if (lastComand === "start" && req.params.command === "start") {
		return res.status(406).send({
			message: `Counting already started at ${lastTimestamp} with description: ${lastDescription} `,
		});
	}
	if (lastComand === "stop" && req.params.command === "stop") {
		return res.status(406).send({
			message: `Counting already stopped at ${lastTimestamp} with description: ${lastDescription} `,
		});
	}
	fileHandeler.close();
	return res.status(400).send({
		message: `Invalid data`,
	});

	async function appendData(req: Request) {
		const data: string = `${new Date().toISOString()},${req.params.command},${req.params.description}\n`;
		const append = await fs.promises.appendFile(`./user_data/${req.params.userId}`, data);
		return append;
	}
});

app.get("/users/:userId/data", async (req: Request, res: Response): Promise<Response> => {
	const fileHandeler = await fs.promises.open(`./user_data/${req.params.userId}`, "a+");
	const fileBuffer = await fs.promises.readFile(fileHandeler);
	fileHandeler.close();
	const records = fileBuffer.toString("utf-8").split("\n");
	const dataArray = records.map((x: string) => {
		let result = x.split(",");
		result.push(new Date(result[0]).getDate().toString());
		result.push(new Date(result[0]).getTime().toString());
		return result;
	});
	const timestampsArray = _.chunk(dataArray, 2);
	timestampsArray.map((x) => {
		return x.reduce((prev, curr) => {
			console.log(prev[0]);
			console.log(curr[0]);
			const startDayTillNextDay = Date.parse(prev[0].substring(0, 10)) + 1;
			const endDay = Date.parse(curr[0].substring(0, 10));
			console.log(startDayTillNextDay);
			console.log(endDay);
			const newElement = curr;
			curr.push(String(Number(curr[4]) - Number(prev[4])));
			return newElement;
		});
	});
	timestampsArray;
	const chartData = [];
	console.log(timestampsArray);
	// dataArray.reduce((prev, curr): string[] => {
	// 	let newElement: { start } = curr;
	// 	if (prev[1] === "start" && curr[1] === "stop") {
	// 		newElement[4] = prev[4];
	// 	} else return newElement;
	// });
	return res.status(200).send({
		message: "Hello World!",
	});
});

export { app };

process.on("exit", function () {
	console.log("Goodbye!");
});
