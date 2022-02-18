"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.prepareChartData = exports.getUserCommnads = void 0;
var dataParser_1 = require("@classes/dataParser");
var commands_1 = require("@models/commands");
var dataParser = new dataParser_1.DataParser();
function getUserCommnads(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var rawData;
        return __generator(this, function (_a) {
            rawData = commands_1.commandModel
                .find({ $and: [{ userId: userId }], $or: [{ command: "startUser" }, { command: "stopUser" }] }, { _id: 0, userId: 1, command: 1, description: 1, timestamp: 1 })
                .lean()
                .sort({ timestamp: "desc" })
                .catch(function (error) {
                throw error;
            });
            return [2 /*return*/, rawData];
        });
    });
}
exports.getUserCommnads = getUserCommnads;
function prepareChartData(rawData) {
    return __awaiter(this, void 0, void 0, function () {
        var data, reducedObject, reducedData, _i, data_1, element, splitedData, _a, reducedData_1, timeElement, pushObject, test, chartData, i, summOfTimeInMs, _b, test_1, element;
        return __generator(this, function (_c) {
            if (rawData === undefined || rawData.length <= 0)
                return [2 /*return*/, null];
            data = dataParser.splitArrayToArrayOfArrays(rawData, 2);
            if (data === null)
                return [2 /*return*/, null];
            reducedObject = {
                beginDate: new Date(),
                endDate: new Date(),
                object: {},
            };
            reducedData = [];
            for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                element = data_1[_i];
                reducedObject.beginDate = new Date(element[1].timestamp);
                reducedObject.endDate = new Date(element[0].timestamp);
                reducedObject.object = element[0];
                reducedData.push(Object.assign({}, reducedObject));
            }
            splitedData = [];
            for (_a = 0, reducedData_1 = reducedData; _a < reducedData_1.length; _a++) {
                timeElement = reducedData_1[_a];
                pushObject = dataParser.splitTimeObjectToArrayOfObjects(timeElement);
                if (pushObject !== null)
                    splitedData.push(pushObject);
            }
            test = splitedData.reverse().flat();
            chartData = [{ x: [], y: [], type: "bar" }];
            chartData[0].x = Object.values(test)
                .map(function (element) { return element.beginDate.toDateString(); })
                .filter(function (value, index, self) { return self.indexOf(value) == index; });
            i = 0;
            summOfTimeInMs = 0;
            for (_b = 0, test_1 = test; _b < test_1.length; _b++) {
                element = test_1[_b];
                if (chartData[0].x[i] === element.beginDate.toDateString()) {
                    summOfTimeInMs += element.endDate.getUTCSeconds() - element.beginDate.getUTCSeconds();
                }
                else {
                    chartData[0].y.push(summOfTimeInMs);
                    summOfTimeInMs = 0;
                    i++;
                }
            }
            chartData[0].y.push(summOfTimeInMs);
            return [2 /*return*/, chartData];
        });
    });
}
exports.prepareChartData = prepareChartData;
var getUserData = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userCommands, chartData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.query.userId === undefined)
                        return [2 /*return*/, res.status(400).send("userId not found")];
                    return [4 /*yield*/, getUserCommnads(String(req.query.userId))];
                case 1:
                    userCommands = _a.sent();
                    return [4 /*yield*/, prepareChartData(userCommands)];
                case 2:
                    chartData = _a.sent();
                    if (chartData === null)
                        res.send("No data available").status(400);
                    return [2 /*return*/, res.status(200).send(chartData)];
            }
        });
    });
};
exports.getUserData = getUserData;
