import request from "supertest";
import { app } from "../app";
import * as fs from "fs";

const userName = "test";
const taskDesrition = "Test description";

describe("create user", () => {
	it("should return a 200 status code", async () => {
		const response = await request(app).post(`/users/${userName}`).send();
		expect(response.statusCode).toBe(200);
	});
});

describe("start user", () => {
	it("should return a 200 status code", async () => {
		const response = await request(app).post(`/users/${userName}/start/${taskDesrition}`).send();
		const fileBuffer = await fs.promises.readFile(`./user_data/${userName}`);
		const file = fileBuffer.toString("utf-8").split("\n");
		const record = file[file.length - 1].split(",");
		expect(record[1]).toBe("start");
		expect(response.statusCode).toBe(200);
	});
});

describe("stop user", () => {
	it("should return a 200 status code", async () => {
		const response = await request(app).post(`/users/${userName}/stop/${taskDesrition}`).send();
		expect(response.statusCode).toBe(200);
	});
});

describe("delete user", () => {
	it("should return a 200 status code", async () => {
		const response = await request(app).post(`/users/${userName}`).send();
		expect(response.statusCode).toBe(200);
	});
});
