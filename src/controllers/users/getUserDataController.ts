import { Request, Response } from "express";
import { CommandRequest } from "../../types/routes.types";
import commandModel from "../../models/users";

const getUserData = async (req: Request, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};
	const rawData = await commandModel
		.find({ name: req.query.userId, $or: [{ command: "startUser" }, { command: "stopUser" }] })
		.sort({ createdAt: "desc" });

	responseObject.dbResponse = rawData;
	responseObject.message = `Ta da`;
	return res.status(200).send(responseObject);
};
export default getUserData;
