import { Schema, model, Model, Types } from "mongoose";
import { DataParser } from "@classes/recruitmentTask1/dataParser";
import { splitTimeObject } from "@src/types/main.types";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

// 1. Create an interface representing a document in MongoDB.
export interface IDataFiles {
	userId: string;
	data: {};
	_id: Types.ObjectId;
}

export interface IDataBaseDocument extends IDataFiles, Document {}

export interface IDataBaseModel extends Model<IDataBaseDocument> {}

const commandSchema = new Schema<IDataBaseDocument, IDataBaseModel>(
	{
		userId: { type: String},
		data: { type: {}, required: true },
	},
	{ timestamps: true, _id: true }
);

// 5. Create a Model - MongoDB
export const DataModel = model<IDataBaseDocument, IDataBaseModel>("Commands", commandSchema);

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
