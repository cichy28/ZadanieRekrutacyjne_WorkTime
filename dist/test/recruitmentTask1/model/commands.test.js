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
var commands_1 = require("@models/recruitmentTask1/commands");
var mongoose_1 = __importDefault(require("mongoose"));
var testCollectionName = "Task_TimeWork_Test";
var userIdOfTestUser = "TestData";
var testDBURL = "mongodb+srv://JC:JC123@cluster0.of2pn.mongodb.net/" + testCollectionName + "?retryWrites=true&w=majority";
var testData = require("@public/testData");
var testDataValues = Object.values(testData);
console.log(testDataValues);
describe("Test commands model", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _i, key, newRecord;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.connect(testDBURL)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, mongoose_1.default.connection.db.dropDatabase()];
                case 2:
                    _c.sent();
                    _a = [];
                    for (_b in testData)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    key = _a[_i];
                    newRecord = new commands_1.CommandModel(testData[key]);
                    return [4 /*yield*/, newRecord.save()];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    it("Should return last comand", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commands_1.CommandModel.getLastDocumentFromUser(userIdOfTestUser)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(expect.objectContaining(testData["testDocument_newest"]));
                    return [2 /*return*/];
            }
        });
    }); });
    var test_commands;
    it("Should return all commands from user", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commands_1.CommandModel.findAllDocumentsFromUser(userIdOfTestUser)];
                case 1:
                    test_commands = _a.sent();
                    expect(test_commands).toHaveLength(testDataValues.length - 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return data for chart", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commands_1.CommandModel.parseCommandsToActivityTime(test_commands)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([
                        {
                            type: "bar",
                            x: [
                                "Sat Feb 05 2022",
                                "Sun Feb 06 2022",
                                "Mon Feb 07 2022",
                                "Tue Feb 08 2022",
                                "Wed Feb 09 2022",
                                "Thu Feb 10 2022",
                                "Fri Feb 11 2022",
                            ],
                            y: [-11, 0, 0, 0, 0, 0, 0],
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.disconnect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
