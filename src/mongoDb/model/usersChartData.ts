import mongoose from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Command {
	name: string;
	command: string;
	description?: string;
}

// 2. Create a Schema corresponding to the document interface.
const commandSchema = new mongoose.Schema<Command>(
	{
		name: { type: String, required: true },
		command: { type: String, required: true },
		description: { type: String, required: false },
	},
	{ timestamps: true }
);

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
commandSchema.methods.test = function test() {
	const greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
	console.log(greeting);
};

// 3. Create a Model.
const commandModel = mongoose.model<Command>("Commands", commandSchema);

export default commandModel;
