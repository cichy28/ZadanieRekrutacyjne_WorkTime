import express, { Router, Application, Request, Response } from "express";
import { resourceLimits } from "worker_threads";
import { TypedRequestBody, CommandRequest } from "../../app_model";
import * as fs from "fs";

const routes = express.Router({ mergeParams: true });

// Start/stop users activity
routes.post("/:userId", async (req: Request, res: Response): Promise<Response> => {
	console.log(req.body);
	const description = req.body.description;
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

	async function appendRawData(timestamp: Date, req: CommandRequest) {
		const data: string = `${timestamp.toISOString()},${req.params.command},${req.params.description}\n`;
		const append = await fs.promises.appendFile(`./user_data/${req.params.userId}`, data);
		return append;
	}

	async function appendChartData(timestamp: Date, req: CommandRequest, lastTimestamp: Date) {
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

function checkData(date: Date, days: number) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

module.exports = routes;

/**
 * @swagger
 * /users/startUser/{userId}:
 *   post:
 *     summary: Start.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrription of task.
 *                 example: Coding...
 *     responses:
 *       200:
 *         description: Started.
 */
