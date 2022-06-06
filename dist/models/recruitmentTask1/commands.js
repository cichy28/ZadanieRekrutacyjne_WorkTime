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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommand = exports.CommandModel = void 0;
var mongoose_1 = require("mongoose");
var dataParser_1 = require("@classes/recruitmentTask1/dataParser");
var ajv_1 = __importDefault(require("ajv"));
var ajv = new ajv_1.default();
var commandSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    command: { type: String, required: true },
    description: { type: String, required: false },
    timestamp: { type: String, required: false },
}, { timestamps: false, _id: true });
commandSchema.statics.findAllDocumentsFromUser = function (userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.find({ $and: [{ userId: userId }], $or: [{ command: "startUser" }, { command: "stopUser" }] }, { _id: 1, userId: 1, command: 1, description: 1, timestamp: 1 })
                    .lean()
                    .sort({ timestamp: "desc" })
                    .catch(function (error) {
                    throw error;
                })];
        });
    });
};
commandSchema.statics.getLastDocumentFromUser = function (userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.findOne({ userId: userId }).sort({ _id: -1 })];
        });
    });
};
commandSchema.statics.parseCommandsToActivityTime = function (rawData) {
    var dataParser = new dataParser_1.DataParser();
    if (rawData === undefined || rawData.length <= 0)
        return null;
    var data = dataParser.splitArrayToArrayOfArrays(rawData, 2);
    if (data === null)
        return null;
    var reducedObject = {
        beginDate: new Date(),
        endDate: new Date(),
        object: {},
    };
    var reducedData = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var element = data_1[_i];
        reducedObject.beginDate = new Date(String(element[1].timestamp));
        reducedObject.endDate = new Date(String(element[0].timestamp));
        reducedObject.object = element[0];
        reducedData.push(Object.assign({}, reducedObject));
    }
    var splitedData = [];
    for (var _a = 0, reducedData_1 = reducedData; _a < reducedData_1.length; _a++) {
        var timeElement = reducedData_1[_a];
        var pushObject = dataParser.splitTimeObjectToArrayOfObjects(timeElement);
        if (pushObject !== null)
            splitedData.push(pushObject);
    }
    var test = splitedData.reverse().flat();
    var chartData = [{ x: [], y: [], type: "bar" }];
    chartData[0].x = Object.values(test)
        .map(function (element) { return element.beginDate.toDateString(); })
        .filter(function (value, index, self) { return self.indexOf(value) == index; });
    var i = 0;
    var summOfTimeInMs = 0;
    for (var _b = 0, test_1 = test; _b < test_1.length; _b++) {
        var element = test_1[_b];
        var diff = element.endDate.getTime() / 1000 - element.beginDate.getTime() / 1000;
        summOfTimeInMs += diff;
        if (chartData[0].x[i] !== element.beginDate.toDateString()) {
            chartData[0].y.push(summOfTimeInMs);
            summOfTimeInMs = diff;
            i++;
        }
    }
    chartData[0].y.push(summOfTimeInMs);
    return chartData;
};
// 5. Create a Model - MongoDB
exports.CommandModel = (0, mongoose_1.model)("Commands", commandSchema);
// 2. Create a validation schema - AJV.
var validationSchema = {
    type: "object",
    properties: {
        userId: { type: "string" },
        command: { type: "string" },
        description: { type: "string", nullable: true },
        timestamp: { type: "string", nullable: true },
    },
    required: ["userId", "command"],
    additionalProperties: false,
};
// 3. Create validation function - AJV
exports.isCommand = ajv.compile(validationSchema);
