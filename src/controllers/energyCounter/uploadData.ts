import { raw, Request, Response } from "express";
import { ICommand, ICommandBaseDocument, CommandModel } from "@models/recruitmentTask1/commands";
import mongoose from "mongoose";
import { DataModel } from "@models/energyCounter/dataFIles";

export const uploadData = async function (req: Request, res: Response, next: Function): Promise<Response> {
	const csv = require("fast-csv");
	const csvFile = req.file;
	if (!csvFile) {
		return res.status(400).send("No file was uploaded.");
	}

	const csvData = [];

	csv.fromString(csvFile.toString(), {
		headers: true,
		ignoreEmpty: true,
	})
		.on("data", function (data: any) {
			csvData.push(data);
		})
		.on("end", function () {
			console.log(csvData);
		});
	console.log("Upload succsessfull - guzik do generowania raportu");
};
