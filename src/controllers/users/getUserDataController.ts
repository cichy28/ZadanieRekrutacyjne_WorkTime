import { raw, Request, Response } from "express";
import DataParser from "../../classes/dataParser";
import commandModel from "../../models/commands";
import { splitTimeObject } from "../../types/main.types";
import { command } from "../../models/commands";
import * as _ from "lodash";

const dataParser = new DataParser();

type chartType = { x: string[]; y: number[]; type: string }[] | null;

async function prepareChartData(req: Request, res: Response) {
	let rawData = await commandModel
		.find(
			{ $and: [{ userId: req.query.userId }], $or: [{ command: "startUser" }, { command: "stopUser" }] },
			"name command description timestamp"
		)
		.lean()
		.sort({ timestamp: "desc" })
		.catch((error) => {
			console.log(error);
		});
	if (rawData === undefined || rawData.length <= 0) return null;
	const data = dataParser.splitArrayToArrayOfArrays(rawData, 2);
	if (data === null) return null;
	let reducedObject: splitTimeObject = {
		beginDate: new Date(),
		endDate: new Date(),
		object: {},
	};
	const reducedData = [];
	for (const element of data) {
		reducedObject.beginDate = new Date(element[1].timestamp);
		reducedObject.endDate = new Date(element[0].timestamp);
		reducedObject.object = element[0];
		reducedData.push(Object.assign({}, reducedObject));
	}
	const splitedData = [];
	for (let timeElement of reducedData) {
		const pushObject = dataParser.splitTimeObjectToArrayOfObjects(timeElement);
		if (pushObject !== null) splitedData.push(pushObject);
	}
	const test = splitedData.reverse().flat();

	const chartData: chartType = [{ x: [], y: [], type: "bar" }];
	chartData[0].x = Object.values(test)
		.map((element) => element.beginDate.toDateString())
		.filter((value, index, self) => self.indexOf(value) == index);
	let i = 0;
	let summOfTimeInMs = 0;
	for (const element of test) {
		if (chartData[0].x[i] === element.beginDate.toDateString()) {
			summOfTimeInMs += element.endDate.getUTCSeconds() - element.beginDate.getUTCSeconds();
		} else {
			chartData[0].y.push(summOfTimeInMs);
			summOfTimeInMs = 0;
			i++;
		}
	}
	chartData[0].y.push(summOfTimeInMs);
	return chartData;
}

const getUserData = async (req: Request, res: Response): Promise<Response> => {
	const chartData = await prepareChartData(req, res);
	if (chartData === null) res.send("No data available").status(200);
	return res.status(200).send(chartData);
};
export { prepareChartData };
export default getUserData;
