"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataParser_1 = require("../../classes/dataParser");
var dataParser = new dataParser_1.DataParser();
describe("splitArrayToArrayOfArrays", function () {
    it("Should nest the array", function () {
        expect(dataParser.splitArrayToArrayOfArrays([{ a: 1 }, { a: 2 }], 2)).toEqual([[{ a: 1 }, { a: 2 }]]);
    });
    it("Should split array", function () {
        expect(dataParser.splitArrayToArrayOfArrays([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], 2)).toEqual([
            [{ a: 1 }, { a: 2 }],
            [{ a: 3 }, { a: 4 }],
        ]);
    });
    it("Should split array2", function () {
        expect(dataParser.splitArrayToArrayOfArrays([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], 3)).toEqual([
            [{ a: 1 }, { a: 2 }, { a: 3 }],
        ]);
    });
});
var start = new Date("2022-01-24T10:00:00.000+00:00");
var stop = new Date("2022-01-26T12:00:00.000+00:00");
describe("splitTimeObjectToArrayOfObjects", function () {
    it("Should not split the object ", function () {
        expect(dataParser.splitTimeObjectToArrayOfObjects({
            object: { a: 1 },
            beginDate: new Date("2022-01-24T00:00:01.000+00:00"),
            endDate: new Date("2022-01-24T23:59:00.000+00:00"),
        })).toEqual([
            {
                object: { a: 1 },
                beginDate: new Date("2022-01-24T00:00:01.000+00:00"),
                endDate: new Date("2022-01-24T23:59:00.000+00:00"),
            },
        ]);
    });
    it("Should split time object ", function () {
        expect(dataParser.splitTimeObjectToArrayOfObjects({
            object: { a: 1 },
            beginDate: start,
            endDate: stop,
        })).toEqual([
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
