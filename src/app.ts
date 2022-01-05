import * as _ from "lodash";
import * as fs from "fs";
import express, { Application, Request, Response } from "express";
const app: Application = express();

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "App is working ;)",
	});
});

// Create user
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

// Delete user
app.delete("/users/:userId", async (req: Request, res: Response): Promise<Response> => {
	try {
		await fs.promises.unlink(`./user_data/${req.params.userId}`);
		await fs.promises.unlink(`./user_data/${req.params.userId}_chart`);
		return res.status(200).send({
			message: "File deleted",
		});
	} catch (error) {
		return res.status(400).send({
			message: "There was an error:" + error,
		});
	}
});

// Start/stop users activity
app.post("/users/:userId/:command/:description", async (req: Request, res: Response): Promise<Response> => {
	const timestamp = new Date(new Date().toUTCString());
	const fileHandeler = await fs.promises.open(`./user_data/${req.params.userId}`, "a+");
	const fileBuffer = await fs.promises.readFile(fileHandeler);
	const file = fileBuffer.toString("utf-8").split("\n");
	if (file.length <= 1) {
		if (req.params.command === "start") {
			appendRawData(timestamp, req);
			return res.status(200).send({
				message: `Counting started at ${timestamp} with description: ${req.params.description} `,
			});
		}
		if (req.params.command === "stop") {
			appendRawData(timestamp, req);
			return res.status(200).send({
				message: `First send start command`,
			});
		}
	}
	file.pop();
	const lastRecord = file[file.length - 1].split(",");
	const [lastTimestamp, lastComand, lastDescription] = lastRecord;
	if (lastComand === "stop" && req.params.command === "start") {
		appendRawData(timestamp, req);
		return res.status(200).send({
			message: `Counting started at ${lastTimestamp} with description: ${req.params.description} `,
		});
	}
	if (lastComand === "start" && req.params.command === "stop") {
		appendRawData(timestamp, req);
		appendChartData(timestamp, req, new Date(lastTimestamp));
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

	async function appendRawData(timestamp: Date, req: Request) {
		const data: string = `${timestamp.toISOString()},${req.params.command},${req.params.description}\n`;
		const append = await fs.promises.appendFile(`./user_data/${req.params.userId}`, data);
		return append;
	}

	async function appendChartData(timestamp: Date, req: Request, lastTimestamp: Date) {
		const endDay = new Date(lastTimestamp);
		endDay.setHours(0, 0, 0, 0);
		const timeDiff = timestamp.getTime() - lastTimestamp.getTime();
		const nextDayInMiliseconds = addDays(endDay, 1).getTime();
		const saveDate = storeData(lastTimestamp);
		let record = { date: saveDate, time: timeDiff, description: req.params.description };

		// Check if start date and end date is the same
		if (nextDayInMiliseconds > timestamp.getTime()) {
			await fs.promises.appendFile(`./user_data/${req.params.userId}_chart`, JSON.stringify(record) + "\n");
			return null;
		}
		// Split time to days
		const timeDiffTillNextDayInMiliseconds = nextDayInMiliseconds - lastTimestamp.getTime();
		let restOfMiliseconds = timeDiff - timeDiffTillNextDayInMiliseconds;

		//Add data from start day
		record.time = timeDiffTillNextDayInMiliseconds;
		await fs.promises.appendFile(`./user_data/${req.params.userId}_chart`, JSON.stringify(record) + "\n");
		let newDate = addDays(new Date(lastTimestamp.toDateString()), 1);

		//Add data if work lasts more then one day
		while (restOfMiliseconds > 86400000) {
			record.time = 86400000;
			restOfMiliseconds -= 86400000;
			newDate = addDays(new Date(newDate.toDateString()), 1);
			record.date = storeData(newDate);
			await fs.promises.appendFile(`./user_data/${req.params.userId}_chart`, JSON.stringify(record) + "\n");
		}

		//Add data from end day
		record.time = restOfMiliseconds;
		newDate = addDays(new Date(lastTimestamp.toDateString()), 1);
		record.date = storeData(newDate);
		await fs.promises.appendFile(`./user_data/${req.params.userId}_chart`, JSON.stringify(record) + "\n");
		return null;
	}
});

app.get("/users/:userId/data", async (req: Request, res: Response): Promise<Response> => {
	const checkFile = fs.existsSync(`./user_data/${req.params.userId}_chart`);
	if (checkFile === false) {
		return res.status(400).send({
			message: `Invalid data`,
		});
	}
	const fileHandeler = await fs.promises.open(`./user_data/${req.params.userId}_chart`, "r");
	const fileBuffer = await fs.promises.readFile(fileHandeler);
	fileHandeler.close();
	const records = fileBuffer.toString().split("\n");
	records.pop();
	let JsonData = records.map((x) => {
		return JSON.parse(x);
	});
	let JsonDataGgrouped = _.groupBy(JsonData, (record) => record.date);
	let result = [{}];
	_.forEach(JsonDataGgrouped, (element, key) => {
		let timeSum = 0;
		_.forEach(element, (element2) => {
			timeSum += element2.time;
		});
		let resultRecord: { date: string; time: number } = { date: key, time: timeSum };
		result.push(resultRecord);
	});
	return res.status(200).json(result);
});

function pad(d: number) {
	return d < 10 ? "0" + d.toString() : d.toString();
}

function storeData(date: Date): string {
	return `${date.getUTCFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

function addDays(date: Date, days: number) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export { app };

process.on("exit", function () {
	console.log("Goodbye!");
});
