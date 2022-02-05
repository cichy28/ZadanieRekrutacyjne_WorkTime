import { raw, Request, Response } from "express";
import DataParser from "../../classes/dataparser";
import commandModel from "../../models/users";
import { splitTimeObject } from "../../types/main.types";
import { command } from "../../models/users";
import * as _ from "lodash";

const dataParser = new DataParser();

const getUserData = async (req: Request, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};
	let rawData = await commandModel
		.find(
			{ name: req.query.userId, $or: [{ command: "startUser" }, { command: "stopUser" }] },
			"name command description timestamp"
		)
		.lean()
		.sort({ timestamp: "desc" });

	if (rawData.length <= 0) return res.send("No data available").status(200);
	const data = dataParser.splitArrayToArrayOfArrays(rawData, 2);
	if (data === null) return res.send("No data available").status(200);
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

	const chartData: { x: string[]; y: number[]; type: string }[] = [{ x: [], y: [], type: "bar" }];
	chartData[0].x = Object.values(test)
		.map((element) => element.beginDate.toDateString())
		.filter((value, index, self) => self.indexOf(value) == index);
	let i = 0;
	let counter = 0;
	for (const element of test) {
		if (chartData[0].x[i] === element.beginDate.toDateString()) {
			counter++;
		} else {
			chartData[0].y.push(counter);
			counter = 1;
			i++;
		}
	}
	chartData[0].y.push(counter);
	responseObject.dbResponse = chartData;
	responseObject.message = `Ta da`;
	res.render("chart", { title: "Main paige", chartData: chartData, buttons: true });
	return res.status(200).send(responseObject);
};
export default getUserData;
