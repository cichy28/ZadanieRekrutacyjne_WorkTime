import { Request, Response } from "express";
import { CommandRequest } from "../../types/routes.types";
import commandModel from "../../models/users";

const getUserData = async (req: Request, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};
	const rawData = await commandModel
		.find({ name: req.params.userId, $or: [{ command: "startUser" }, { command: "stopUser" }] })
		.sort({ createdAt: "desc" });

	// Tu sth is not yes - można lepiej
	console.log(rawData);
	let memo = [];
	rawData.map((element, key) => {
		console.log(key);
	});

	responseObject.dbResponse = rawData;
	responseObject.message = `Ta da`;
	return res.status(406).send(responseObject);
};
export default getUserData;
