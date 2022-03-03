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
	findLastCommandFromUser(this: Model<ICommandBaseDocument>, id: string): Promise<ICommandBaseDocument>;
}

export interface ICommandBaseModel extends Model<ICommandBaseDocument> {
	findLastCommandFromUser(this: Model<ICommandBaseDocument>, id: string): Promise<ICommandBaseDocument>;
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

commandSchema.statics.findLastCommandFromUser = async function (this: Model<ICommandBaseDocument>, id: string) {
	console.log("asdasda JC@22");
	return this.findOne({ id });
};

// 5. Create a Model - MongoDB
export const commandModel = model<ICommandBaseDocument, ICommandBaseModel>("Commands", commandSchema);

// 2. Create a validation schema - AJV.

const validationSchema: JSONSchemaType<ICommand> = {
	type: "object",
	properties: {
		userId: { type: "string" },
		command: { type: "string" },
		description: { type: "string" },
		timestamp: { type: "string" },
	},
	required: ["userId", "command"],
	additionalProperties: false,
};

// 3. Create validation function - AJV

const isCommand = ajv.compile(validationSchema);
