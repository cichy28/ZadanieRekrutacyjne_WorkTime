import { DataParser } from "@src/classes/dataParser";

const dataParser = new DataParser();

describe("splitArrayToArrayOfArrays", () => {
	it("Should nest the array", () => {
		expect(dataParser.splitArrayToArrayOfArrays([{ a: 1 }, { a: 2 }], 2)).toEqual([[{ a: 1 }, { a: 2 }]]);
	});
	it("Should split array", () => {
		expect(dataParser.splitArrayToArrayOfArrays([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], 2)).toEqual([
			[{ a: 1 }, { a: 2 }],
			[{ a: 3 }, { a: 4 }],
		]);
	});
	it("Should split array", () => {
		expect(
			dataParser.splitArrayToArrayOfArrays([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }], 2)
		).toEqual([
			[{ a: 1 }, { a: 2 }],
			[{ a: 3 }, { a: 4 }],
			[{ a: 5 }, { a: 6 }],
		]);
	});
	it("Should split array2", () => {
		expect(dataParser.splitArrayToArrayOfArrays([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], 3)).toEqual([
			[{ a: 1 }, { a: 2 }, { a: 3 }],
		]);
	});
});

const start = new Date("2022-01-24T10:00:00.000+00:00");
const stop = new Date("2022-01-26T12:00:00.000+00:00");

describe("splitTimeObjectToArrayOfObjects", () => {
	it("Should not split the object ", () => {
		expect(
			dataParser.splitTimeObjectToArrayOfObjects({
				object: { a: 1 },
				beginDate: new Date("2022-01-24T00:00:01.000+00:00"),
				endDate: new Date("2022-01-24T23:59:00.000+00:00"),
			})
		).toEqual([
			{
				object: { a: 1 },
				beginDate: new Date("2022-01-24T00:00:01.000+00:00"),
				endDate: new Date("2022-01-24T23:59:00.000+00:00"),
			},
		]);
	});
	it("Should split time object ", () => {
		expect(
			dataParser.splitTimeObjectToArrayOfObjects({
				object: { a: 1 },
				beginDate: start,
				endDate: stop,
			})
		).toEqual([
			{
				object: { a: 1 },
				beginDate: new Date("2022-01-24T10:00:00.000+00:00"),
				endDate: new Date("2022-01-25T00:00:00.000+00:00"),
			},
			{
				object: { a: 1 },
				beginDate: new Date("2022-01-25T00:00:00.000+00:00"),
				endDate: new Date("2022-01-26T00:00:00.000+00:00"),
			},
			{
				object: { a: 1 },
				beginDate: new Date("2022-01-26T00:00:00.000+00:00"),
				endDate: new Date("2022-01-26T12:00:00.000+00:00"),
			},
		]);
	});
});
