import request from "supertest";
import { app } from "../app";
import * as fs from "fs";

const userName = "test";
const taskDesription1 = "Test description";
const taskDesription2 = "Test description2";

beforeAll(() => {
	fs.promises.unlink(`./user_data/${userName}`);
	fs.promises.unlink(`./user_data/${userName}_chart`);
});

describe("Create a user", () => {
	it("should return a 200 status code", async () => {
		const response = await request(app).post(`/users/${userName}`).send();
		const checkFile = fs.existsSync(`./user_data/${userName}`);
		expect(checkFile).toBe(true);
		expect(response.statusCode).toBe(200);
	});
});

describe("Start the user", () => {
	it("should return a 200 status code", async () => {
		const response = await request(app).post(`/users/${userName}/start/${taskDesription1}`).send();
		const fileBuffer = await fs.promises.readFile(`./user_data/${userName}`);
		const file = fileBuffer.toString("utf-8").split("\n");
		file.pop();
		const record = file[file.length - 1].split(",");
		expect(record[1]).toBe("start");
		expect(response.statusCode).toBe(200);
	});
});

describe("Start the same user again", () => {
	it("should return a 406 status code", async () => {
		const response = await request(app).post(`/users/${userName}/start/${taskDesription2}`).send();
		const fileBuffer = await fs.promises.readFile(`./user_data/${userName}`);
		const file = fileBuffer.toString("utf-8").split("\n");
		file.pop();
		const record = file[file.length - 1].split(",");
		expect(record[2]).toBe(taskDesription1);
		expect(response.statusCode).toBe(406);
	});
});

describe("Stop the user", () => {
	it("should return a 200 status code", async () => {
		await setTimeout(() => {}, 1000);
		const response = await request(app).post(`/users/${userName}/stop/${taskDesription1}`).send();
		const fileBuffer = await fs.promises.readFile(`./user_data/${userName}`);
		const file = fileBuffer.toString("utf-8").split("\n");
		file.pop();
		const record = file[file.length - 1].split(",");
		expect(record[1]).toBe("stop");
		const checkFile = fs.existsSync(`./user_data/${userName}_chart`);
		expect(checkFile).toBe(true);
		expect(response.statusCode).toBe(200);
	});
});

describe("Stop the same user again", () => {
	it("should return a 406 status code", async () => {
		const response = await request(app).post(`/users/${userName}/stop/${taskDesription2}`).send();
		const fileBuffer = await fs.promises.readFile(`./user_data/${userName}`);
		const file = fileBuffer.toString("utf-8").split("\n");
		file.pop();
		const record = file[file.length - 1].split(",");
		expect(record[2]).toBe(taskDesription1);
		expect(response.statusCode).toBe(406);
	});
});

describe("Get data about user", () => {
	it("should return a 200 status code", async () => {
		const response = await request(app).get(`/users/${userName}/data`).send();
		const fileBuffer = await fs.promises.readFile(`./user_data/${userName}`);
		const file = fileBuffer.toString("utf-8").split("\n");
		file.pop();
		const record1 = file[file.length - 2].split(",");
		const record2 = file[file.length - 1].split(",");
		const timeDiff = new Date(record2[0]).getTime() - new Date(record1[0]).getTime();
		expect(response.body[1].time).toBe(timeDiff);
		expect(response.statusCode).toBe(200);
	});
});

describe("delete user", () => {
	it("should return a 200 status code", async () => {
		const response = await request(app).delete(`/users/${userName}`).send();
		const checkFile1 = fs.existsSync(`./user_data/${userName}`);
		const checkFile2 = fs.existsSync(`./user_data/${userName}_chart`);
		expect(checkFile1).toBe(false);
		expect(checkFile2).toBe(false);
		expect(response.statusCode).toBe(200);
	});
});
