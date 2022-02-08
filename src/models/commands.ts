import mongoose from "mongoose";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

// 1. Create an interface representing a document in MongoDB.
interface command {
	userId: string;
	command: string;
	description: string;
	timestamp: string;
}

// 2. Create a validation schema - AJV.

const schema: JSONSchemaType<command> = {
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

const isCommand = ajv.compile(schema);

// 4. Create a Schema corresponding to the document interfac - MongoDB.

const commandSchema = new mongoose.Schema<command>(
	{
		userId: { type: String, required: true },
		command: { type: String, required: true },
		description: { type: String, required: false },
		timestamp: { type: String, required: true },
	},
	{ timestamps: true }
);

// 5. Create a Model - MongoDB

const commandModel = mongoose.model<command>("Commands", commandSchema);

export { command, isCommand };
export default commandModel;
