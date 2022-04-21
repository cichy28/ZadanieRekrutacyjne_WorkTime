import { raw, Request, Response } from "express";
import { ICommand, ICommandBaseDocument, CommandModel } from "@models/recruitmentTask1/commands";
import mongoose from "mongoose";
import { DataModel, IDataFiles, ICsvRow } from "@models/energyCounter/dataFIles";
import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

export const uploadData = async function (req: Request, res: Response, next: Function): Promise<Response> {
	const csvFile = req.file;
	const userId = req.body.userId;
	if (!csvFile) {
		return res.status(400).send("No file was uploaded.");
	}

	let csvData: IDataFiles = { userId: userId, data: [] };
	let stream = fs.createReadStream(csvFile.path);
	let csvStream = csv
		.parse()
		.on("data", (data) => {
			csvData.data.push({
				timestamp: data[0],
				energyUsed: data[1],
				energyReturend: data[2],
			});
		})
		.on("error", (error) => {
			return res.status(500).send(error);
		})
		.on("end", async () => {
			csvData.data.shift();
			let newDataset = new DataModel(csvData);
			if ((await DataModel.exists({ userId: userId })) === null) {
				const saveFile = await newDataset.save();
				if (saveFile === newDataset) {
					fs.promises.unlink(csvFile.path).then(() => {
						console.log("Temporary file deleted");
					});
				}
				return res.status(200).send("Data uploaded");
			} else {
				return res.status(400).send("Dataset for this user already exists");
			}
		});

	stream.pipe(csvStream);
};
