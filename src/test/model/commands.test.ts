import { ICommand, ICommandBaseDocument, CommandModel, isCommand } from "@models/commands";
import mongoose from "mongoose";
import { createCompilerHost } from "typescript";

const testCollectionName = "Task_TimeWork_Test";
const userIdOfTestUser = "TestData";
const testDBURL =
	"mongodb+srv://JC:JC123@cluster0.of2pn.mongodb.net/" + testCollectionName + "?retryWrites=true&w=majority";
let testData: { [id: string]: ICommand } = require("@public/testData");
const testDataValues = Object.values(testData);
console.log(testDataValues);
describe("Test commands model", () => {
	beforeAll(async () => {
		await mongoose.connect(testDBURL);
		await mongoose.connection.db.dropDatabase();
		for (const key in testData) {
			let newRecord = new CommandModel(testData[key]);
			await newRecord.save();
		}
	});

	it("Should return last comand", async () => {
		const result = await CommandModel.getLastDocumentFromUser(userIdOfTestUser);
		expect(result).toEqual(expect.objectContaining(testData["testDocument_newest"]));
	});

	let test_commands: ICommandBaseDocument[];
	it("Should return all commands from user", async () => {
		test_commands = await CommandModel.findAllDocumentsFromUser(userIdOfTestUser);
		expect(test_commands).toHaveLength(testDataValues.length - 1);
	});

	it("Should return data for chart", async () => {
		const result = await CommandModel.parseCommandsToActivityTime(test_commands);
		expect(result).toEqual([
			{
				type: "bar",
				x: [
					"Sat Feb 05 2022",
					"Sun Feb 06 2022",
					"Mon Feb 07 2022",
					"Tue Feb 08 2022",
					"Wed Feb 09 2022",
					"Thu Feb 10 2022",
					"Fri Feb 11 2022",
				],
				y: [-11, 0, 0, 0, 0, 0, 0],
			},
		]);
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});
});
