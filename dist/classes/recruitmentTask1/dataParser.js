"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataParser = void 0;
var _ = __importStar(require("lodash"));
var DataParser = /** @class */ (function () {
    function DataParser() {
    }
    DataParser.prototype.splitArrayToArrayOfArrays = function (array, numberOfElementsInArray) {
        if (array.length < numberOfElementsInArray)
            return null;
        var res = [];
        for (var i = 0; i < array.length; i += numberOfElementsInArray) {
            var chunk = array.slice(i, i + numberOfElementsInArray);
            res.push(chunk);
        }
        return res;
    };
    DataParser.prototype.splitTimeObjectToArrayOfObjects = function (x) {
        var recurencyFunction = this.initSplitTimeObjectToArrayOfObjects();
        return recurencyFunction([x], recurencyFunction);
    };
    DataParser.prototype.initSplitTimeObjectToArrayOfObjects = function () {
        var TimeObjectDivider = this.initTimeObjectDivider();
        return function (x, recurentFunction) {
            var recurency = TimeObjectDivider(x);
            if (!recurency.flag) {
                return recurentFunction(recurency.result, recurentFunction);
            }
            if (recurency.flag) {
                return recurency.result;
            }
            return null;
        };
    };
    DataParser.prototype.initTimeObjectDivider = function () {
        var _this = this;
        var resultArray = [];
        return function (x) {
            var resultObject = _.cloneDeep(x);
            var resultWraper = {
                result: resultObject,
                flag: false,
            };
            var DifferenceInTimeInMinutes = (x[0].endDate.getTime() - x[0].beginDate.getTime()) / 1000 / 60;
            if (DifferenceInTimeInMinutes < _this.minutesUntilMidnight(x[0].beginDate)) {
                resultArray.push(resultObject[0]);
                resultWraper.result = resultArray;
                resultWraper.flag = true;
                return resultWraper;
            }
            resultObject[0].endDate = _this.sameDayButMidnight(resultObject[0].beginDate);
            resultArray.push(resultObject[0]);
            var nextObject = _.cloneDeep(x);
            nextObject[0].beginDate = _this.sameDayButMidnight(resultObject[0].beginDate);
            resultWraper.result = nextObject;
            return resultWraper;
        };
    };
    DataParser.prototype.sameDayButMidnight = function (date) {
        var midnight = _.cloneDeep(date);
        midnight.setUTCHours(24);
        midnight.setUTCMinutes(0);
        midnight.setUTCSeconds(0);
        midnight.setUTCMilliseconds(0);
        return midnight;
    };
    DataParser.prototype.minutesUntilMidnight = function (date) {
        return (this.sameDayButMidnight(date).getTime() - date.getTime()) / 1000 / 60;
    };
    return DataParser;
}());
exports.DataParser = DataParser;
