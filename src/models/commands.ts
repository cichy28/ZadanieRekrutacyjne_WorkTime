import { Schema, model, Model } from "mongoose";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

// 1. Create an interface representing a document in MongoDB.
export interface ICommand {
	userId: string;
	command: string;
	description?: string;
	timestamp?: string;
}

export interface ICommandBaseDocument extends ICommand, Document {
	findAllCommandsFromUser(this: Model<ICommandBaseDocument>, userId: string): Promise<ICommandBaseDocument[]>;
}

export interface ICommandBaseModel extends Model<ICommandBaseDocument> {
	findAllCommandsFromUser(this: Model<ICommandBaseDocument>, userId: string): Promise<ICommandBaseDocument[]>;
}

const commandSchema = new Schema<ICommandBaseDocument, ICommandBaseModel>(
	{
		userId: { type: String, required: true },
		command: { type: String, required: true },
		description: { type: String, required: false },
		timestamp: { type: String, required: false },
	},
	{ timestamps: true, _id: false }
);

commandSchema.statics.findAllCommandsFromUser = async function (this: Model<ICommandBaseDocument>, userId: string) {
	return this.find(
		{ $and: [{ userId: userId }], $or: [{ command: "startUser" }, { command: "stopUser" }] },
		{ _id: 0, userId: 1, command: 1, description: 1, timestamp: 1 }
	)
		.lean()
		.sort({ timestamp: "desc" })
		.catch((error) => {
			throw error;
		});
};

// 5. Create a Model - MongoDB
export const commandModel = model<ICommandBaseDocument, ICommandBaseModel>("Commands", commandSchema);

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
