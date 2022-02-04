import { raw, Request, Response } from "express";
import DataParser from "../../classes/dataparser";
import commandModel from "../../models/users";

const dataParser = new DataParser();
const getUserData = async (req: Request, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};
	const rawData = await commandModel
		.find({ name: req.query.userId, $or: [{ command: "startUser" }, { command: "stopUser" }] })
		.sort({ createdAt: "desc" });

	const data = dataParser.splitArrayToArrayOfArrays(rawData, 2);
	if (data === null) return res.status(400);
	const result = [];
	for (let timeElement of data) {
		result.push(dataParser.splitTimeObjectToArrayOfObjects(timeElement));
	}

	responseObject.dbResponse = rawData;
	responseObject.message = `Ta da`;
	res.render("chart", { title: "Main paige", buttons: true });
	return res.status(200);
};
export default getUserData;
