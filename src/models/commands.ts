import { Schema, model, Model, Types } from "mongoose";
import { DataParser } from "@classes/dataParser";
import { splitTimeObject } from "@src/types/main.types";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

// 1. Create an interface representing a document in MongoDB.
export interface ICommand {
	userId: string;
	command: string;
	description?: string;
	timestamp?: string;
	_id: Types.ObjectId;
}

export interface ICommandBaseDocument extends ICommand, Document {
	findAllDocumentsFromUser(this: ICommandBaseDocument, userId: string): Promise<ICommandBaseDocument[]>;
	getLastDocumentFromUser(this: ICommandBaseDocument, userId: string): Promise<ICommandBaseDocument>;
	parseCommandsToActivityTime(data: ICommandBaseDocument[]): any;
}

export interface ICommandBaseModel extends Model<ICommandBaseDocument> {
	findAllDocumentsFromUser(this: Model<ICommandBaseDocument>, userId: string): Promise<ICommandBaseDocument[]>;
	getLastDocumentFromUser(this: Model<ICommandBaseDocument>, userId: string): Promise<ICommandBaseDocument>;
	parseCommandsToActivityTime(data: ICommandBaseDocument[]): any;
}

const commandSchema = new Schema<ICommandBaseDocument, ICommandBaseModel>(
	{
		userId: { type: String, required: true },
		command: { type: String, required: true },
		description: { type: String, required: false },
		timestamp: { type: String, required: false },
	},
	{ timestamps: false, _id: true }
);

commandSchema.statics.findAllDocumentsFromUser = async function (this: Model<ICommandBaseDocument>, userId: string) {
	return this.find(
		{ $and: [{ userId: userId }], $or: [{ command: "startUser" }, { command: "stopUser" }] },
		{ _id: 1, userId: 1, command: 1, description: 1, timestamp: 1 }
	)
		.lean()
		.sort({ timestamp: "desc" })
		.catch((error) => {
			throw error;
		});
};

commandSchema.statics.getLastDocumentFromUser = async function (this: Model<ICommandBaseDocument>, userId: string) {
	return this.find({ userId: userId }).sort({ createdAt: "desc" });
};

type chartType = { x: string[]; y: number[]; type: string }[] | null;

commandSchema.statics.parseCommandsToActivityTime = function (rawData: ICommandBaseDocument[]): chartType {
	const dataParser = new DataParser();
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
		reducedObject.beginDate = new Date(String(element[1].timestamp));
		reducedObject.endDate = new Date(String(element[0].timestamp));
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
};

// 5. Create a Model - MongoDB
export const CommandModel = model<ICommandBaseDocument, ICommandBaseModel>("Commands", commandSchema);

// 2. Create a validation schema - AJV.

const validationSchema: JSONSchemaType<ICommand> = {
	type: "object",
	properties: {
		userId: { type: "string" },
		command: { type: "string" },
		description: { type: "string", nullable: true },
		timestamp: { type: "string", nullable: true },
	},
	required: ["userId", "command"],
	additionalProperties: false,
};

// 3. Create validation function - AJV

export const isCommand = ajv.compile(validationSchema);
