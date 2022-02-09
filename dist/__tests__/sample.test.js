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
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var fs = __importStar(require("fs"));
var userName = "test";
var taskDesription1 = "Test description";
var taskDesription2 = "Test description2";
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, fs.promises.unlink("./user_data/".concat(userName))];
            case 1:
                _a.sent();
                return [4 /*yield*/, fs.promises.unlink("./user_data/".concat(userName, "_chart"))];
            case 2:
                _a.sent();
                return [4 /*yield*/, console.log("All test files deleted")];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log("At least one test file does not exist");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
describe("Create a user", function () {
    it("Should return a 200 status code and should create new file", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, checkFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/users/createUser/".concat(userName)).send()];
                case 1:
                    response = _a.sent();
                    checkFile = fs.existsSync("./user_data/".concat(userName));
                    expect(checkFile).toBe(true);
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Start the user", function () {
    it("Should return a 200 status code and should add new record", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, fileBuffer, file, record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/users/startUser/").send({ description: taskDesription1 })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, fs.promises.readFile("./user_data/".concat(userName))];
                case 2:
                    fileBuffer = _a.sent();
                    file = fileBuffer.toString("utf-8").split("\n");
                    file.pop();
                    record = file[file.length - 1].split(",");
                    expect(record[1]).toBe("start");
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Start the same user again", function () {
    it("Should return a 406 status code and shouldnt add new record", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, fileBuffer, file, record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/users/".concat(userName, "/start/").concat(taskDesription2)).send()];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, fs.promises.readFile("../user_data/".concat(userName))];
                case 2:
                    fileBuffer = _a.sent();
                    file = fileBuffer.toString("utf-8").split("\n");
                    file.pop();
                    record = file[file.length - 1].split(",");
                    expect(record[2]).toBe(taskDesription1);
                    expect(response.statusCode).toBe(406);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Stop the user", function () {
    it("Should return a 200 status code and add new record", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, fileBuffer, file, record, checkFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setTimeout(function () { }, 1000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/users/".concat(userName, "/stop/").concat(taskDesription1)).send()];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, fs.promises.readFile("./user_data/".concat(userName))];
                case 3:
                    fileBuffer = _a.sent();
                    file = fileBuffer.toString("utf-8").split("\n");
                    file.pop();
                    record = file[file.length - 1].split(",");
                    expect(record[1]).toBe("stop");
                    checkFile = fs.existsSync("./user_data/".concat(userName, "_chart"));
                    expect(checkFile).toBe(true);
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Stop the same user again", function () {
    it("Should return a 406 status code and should not add new record", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, fileBuffer, file, record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/users/".concat(userName, "/stop/").concat(taskDesription2)).send()];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, fs.promises.readFile("./user_data/".concat(userName))];
                case 2:
                    fileBuffer = _a.sent();
                    file = fileBuffer.toString("utf-8").split("\n");
                    file.pop();
                    record = file[file.length - 1].split(",");
                    expect(record[2]).toBe(taskDesription1);
                    expect(response.statusCode).toBe(406);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Get data about user", function () {
    it("Should return a 200 status code and send proper data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, fileBuffer, file, record1, record2, timeDiff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).get("/users/".concat(userName, "/data")).send()];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, fs.promises.readFile("./user_data/".concat(userName))];
                case 2:
                    fileBuffer = _a.sent();
                    file = fileBuffer.toString("utf-8").split("\n");
                    file.pop();
                    record1 = file[file.length - 2].split(",");
                    record2 = file[file.length - 1].split(",");
                    timeDiff = new Date(record2[0]).getTime() - new Date(record1[0]).getTime();
                    expect(response.body[1].time).toBe(timeDiff);
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Delete the user", function () {
    it("Should return a 200 status code and delete 2 files", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, checkFile1, checkFile2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).delete("/users/".concat(userName)).send()];
                case 1:
                    response = _a.sent();
                    checkFile1 = fs.existsSync("./user_data/".concat(userName));
                    checkFile2 = fs.existsSync("./user_data/".concat(userName, "_chart"));
                    expect(checkFile1).toBe(false);
                    expect(checkFile2).toBe(false);
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
