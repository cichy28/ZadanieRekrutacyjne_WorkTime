import { Schema, model, Model, Types } from "mongoose";
import { DataParser } from "@classes/recruitmentTask1/dataParser";
import { splitTimeObject } from "@src/types/main.types";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

export interface ICsvRow {
	timestamp: Date;
	energyUsed: number;
	energyReturend: number;
}

// 1. Create an interface representing a document in MongoDB.
export interface IDataFiles {
	nameOfDataset: String;
	tarif: String;
	orderedPower: Number;
	powerConnectionId: String;
	userId: String;
	data: ICsvRow[];
	_id?: Types.ObjectId;
}

export interface IDataBaseDocument extends IDataFiles, Document {}

export interface IDataBaseModel extends Model<IDataBaseDocument> {}

const dataFilesSchema = new Schema<IDataBaseDocument, IDataBaseModel>(
	{
		nameOfDataset: { type: String },
		userId: { type: String },
		tarif: { type: String },
		orderedPower: { type: Number },
		powerConnectionId: { type: String },
		data: { type: [], required: true },
	},
	{ timestamps: true, _id: true }
);

// 5. Create a Model - MongoDB
export const DataModel = model<IDataBaseDocument, IDataBaseModel>("dataFiles", dataFilesSchema);

// 2. Create a validation schema - AJV.

const validationSchema: JSONSchemaType<IDataFiles> = {
	type: "object",
	properties: {
		userId: { type: "string" },
		data: { type: "object" },
	},
	required: ["userId", "data"],
	additionalProperties: false,
};

// 3. Create validation function - AJV

export const isData = ajv.compile(validationSchema);
