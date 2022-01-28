import DataParser from "../../classes/dataparser";

const dataParser = new DataParser();

// describe("splitArrayToArrayOfArrays", () => {
// 	it("Should split array", () => {
// 		expect(dataParser.splitArrayToArrayOfArrays([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], 2)).toEqual([
// 			[{ a: 1 }, { a: 2 }],
// 			[{ a: 3 }, { a: 4 }],
// 		]);
// 	});
// 	it("Should split array2", () => {
// 		expect(dataParser.splitArrayToArrayOfArrays([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], 3)).toEqual([
// 			[{ a: 1 }, { a: 2 }, { a: 3 }],
// 		]);
// 	});
// });

const start = new Date("2022-01-24T10:00:00.000+00:00");
const stop = new Date("2022-01-26T12:00:00.000+00:00");

describe("splitTimeObjectToArrayOfObjects", () => {
	it("Should split time object", () => {
		expect(
			dataParser.splitTimeObjectToArrayOfObjects({
				object: { a: 1 },
				beginDate: start,
				endDate: stop,
				splitInterval: 1,
			})
		).toEqual([{ a: 1 }]);
	});
});
