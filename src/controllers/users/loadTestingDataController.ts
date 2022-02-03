import { Request, Response } from "express";
import { CommandRequest } from "../../types/routes.types";
import commandModel from "../../models/users";

const loadTestingData = async (req: Request, res: Response): Promise<Response> => {
	let responseObject = {
		message: "Invalid data",
		dbResponse: {},
	};

	let newRecord = new commandModel({
		name: req.body.userId,
		command: "startUser",
		description: "test",
		timestamp: Date(),
	});

	const numberOfDays = 14;
	const maxNumberOfCommandsPerDay = 4;

	for (let dayOffset = 0; dayOffset < numberOfDays; dayOffset++) {
		let newDate = new Date();
		newDate.setUTCDate(newDate.getDate() - dayOffset);
		newRecord.timestamp = newDate;
		let numberOfCommandsInTheCurrentDay = getRandomInt(maxNumberOfCommandsPerDay);
		for (let CommandId = 0; CommandId < numberOfCommandsInTheCurrentDay; CommandId++) {
			newRecord.command = newRecord.command === "startUser" ? "stopUser" : "startUser";
			newRecord.description = `Testing data - dayoffset - ${dayOffset}, number of point in day ${numberOfCommandsInTheCurrentDay}`;
			await newRecord.save();
		}
	}

	return res.status(200).send("Ales gute?");
};

function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

export default loadTestingData;
