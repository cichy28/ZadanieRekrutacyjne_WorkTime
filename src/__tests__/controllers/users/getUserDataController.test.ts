import { prepareChartData, getUserCommnads } from "@src/controllers/users/getUserDataController";

// const userName = "test";
// const taskDesription1 = "Test description";
// const taskDesription2 = "Test description2";

// beforeAll(async () => {
// 	try {
// 		await commandModel.deleteMany({ userId: userName });
// 		await console.log(`All test files deleted`);
// 	} catch (e: any) {
// 		console.log("At least one test file does not exist");
// 	}
// });

describe("getUserCommnads", () => {
	it("Should getUserCommnads", async () => {
		expect(await getUserCommnads("TestData")).toBe("");
	});
});

describe("prepareChartData", () => {
	it("Should prepareChartData", async () => {
		expect(prepareChartData(await getUserCommnads("TestData"))).toBe("");
	});
});
