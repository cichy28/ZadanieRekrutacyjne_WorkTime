import mongoose from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface command {
	name: string;
	command: string;
	description: string;
	timestamp: string;
}

// 2. Create a Schema corresponding to the document interface.
const commandSchema = new mongoose.Schema<command>(
	{
		name: { type: String, required: true },
		command: { type: String, required: true },
		description: { type: String, required: false },
		timestamp: { type: String, required: true },
	},
	{ timestamps: true }
);

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
commandSchema.methods.test = function test() {
	const greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
	console.log(greeting);
};

// 3. Create a Model.
const commandModel = mongoose.model<command>("Commands", commandSchema);

export { command };
export default commandModel;
