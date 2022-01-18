import express, { Router, Application, Request, Response } from "express";
import { resourceLimits } from "worker_threads";
import { TypedRequestBody, CommandRequest } from "../../app_model";
import * as fs from "fs";
import * as _ from "lodash";

const routes = express.Router({ mergeParams: true });

// Create user
routes.get("/:userId", async (req: Request, res: Response): Promise<Response> => {
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

module.exports = routes;
