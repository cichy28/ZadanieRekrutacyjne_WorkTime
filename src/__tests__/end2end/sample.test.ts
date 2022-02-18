import request from "supertest";
import app from "../../app";
import { commandModel } from "../../models/commands";

const userName = "test";
const taskDesription1 = "Test description";
const taskDesription2 = "Test description2";

beforeAll(async () => {
	try {
		await commandModel.deleteMany({ userId: userName });
		await console.log(`All test files deleted`);
	} catch (e: any) {
		console.log("At least one test file does not exist");
	}
});

describe("Start the user", () => {
	it("Should return a 200 status code and should add new record", async () => {
		const response = await request(app)
			.post(`/users/setUserData/`)
			.send({ userId: userName, description: taskDesription1 });
		const lastRecord = await commandModel.findOne({ userId: userName }).sort({ createdAt: "desc" });
		expect(lastRecord).toBe("start");
		expect(response.statusCode).toBe(200);
	});
});

// describe("Start the same user again", () => {
// 	it("Should return a 406 status code and shouldnt add new record", async () => {
// 		const response = await request(app).post(`/users/${userName}/start/${taskDesription2}`).send();
// 		const fileBuffer = await fs.promises.readFile(`../user_data/${userName}`);
// 		const file = fileBuffer.toString("utf-8").split("\n");
// 		file.pop();
// 		const record = file[file.length - 1].split(",");
// 		expect(record[2]).toBe(taskDesription1);
// 		expect(response.statusCode).toBe(406);
// 	});
// });

// describe("Stop the user", () => {
// 	it("Should return a 200 status code and add new record", async () => {
// 		await setTimeout(() => {}, 1000);
// 		const response = await request(app).post(`/users/${userName}/stop/${taskDesription1}`).send();
// 		const fileBuffer = await fs.promises.readFile(`./user_data/${userName}`);
// 		const file = fileBuffer.toString("utf-8").split("\n");
// 		file.pop();
// 		const record = file[file.length - 1].split(",");
// 		expect(record[1]).toBe("stop");
// 		const checkFile = fs.existsSync(`./user_data/${userName}_chart`);
// 		expect(checkFile).toBe(true);
// 		expect(response.statusCode).toBe(200);
// 	});
// });

// describe("Stop the same user again", () => {
// 	it("Should return a 406 status code and should not add new record", async () => {
// 		const response = await request(app).post(`/users/${userName}/stop/${taskDesription2}`).send();
// 		const fileBuffer = await fs.promises.readFile(`./user_data/${userName}`);
// 		const file = fileBuffer.toString("utf-8").split("\n");
// 		file.pop();
// 		const record = file[file.length - 1].split(",");
// 		expect(record[2]).toBe(taskDesription1);
// 		expect(response.statusCode).toBe(406);
// 	});
// });

// describe("Get data about user", () => {
// 	it("Should return a 200 status code and send proper data", async () => {
// 		const response = await request(app).get(`/users/${userName}/data`).send();
// 		const fileBuffer = await fs.promises.readFile(`./user_data/${userName}`);
// 		const file = fileBuffer.toString("utf-8").split("\n");
// 		file.pop();
// 		const record1 = file[file.length - 2].split(",");
// 		const record2 = file[file.length - 1].split(",");
// 		const timeDiff = new Date(record2[0]).getTime() - new Date(record1[0]).getTime();
// 		expect(response.body[1].time).toBe(timeDiff);
// 		expect(response.statusCode).toBe(200);
// 	});
// });

// describe("Delete the user", () => {
// 	it("Should return a 200 status code and delete 2 files", async () => {
// 		const response = await request(app).delete(`/users/${userName}`).send();
// 		const checkFile1 = fs.existsSync(`./user_data/${userName}`);
// 		const checkFile2 = fs.existsSync(`./user_data/${userName}_chart`);
// 		expect(checkFile1).toBe(false);
// 		expect(checkFile2).toBe(false);
// 		expect(response.statusCode).toBe(200);
// 	});
// });
