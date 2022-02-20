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
require("module-alias/register");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var morgan_1 = __importDefault(require("morgan"));
var mainRouter_1 = require("@src/routes/mainRouter");
var MongoClient = require("mongodb").MongoClient;
var swaggerJSDoc = require("swagger-jsdoc");
var swaggerDefinition = require("../swagger.json");
var expressValidator = require("express-validator");
// Swager
var options = {
    swaggerDefinition: swaggerDefinition,
    // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
    apis: ["./src/routes/**/*.ts"],
};
var swaggerSpec = swaggerJSDoc(options);
// Express
var port = process.env.PORT;
if (port == null || port == "") {
    port = "3000";
}
var app = (0, express_1.default)();
// Docs
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Logger
app.use((0, morgan_1.default)("dev"));
// Public files
app.use(express_1.default.static("public"));
// Encoding
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("", mainRouter_1.mainRouter);
// View engine
app.set("view engine", "ejs");
app.set("views", "./src/views");
// MongoDB
var uri = "mongodb+srv://JC:JC123@cluster0.of2pn.mongodb.net/Task_TimeWork?retryWrites=true&w=majority";
var startApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mongoose_1.default.connect(uri)];
            case 1:
                _a.sent();
                console.log("database connected");
                return [4 /*yield*/, app.listen(port)];
            case 2:
                _a.sent();
                console.log("server started");
                return [2 /*return*/, "App started correctly - localhost:3000"];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, "App stopped - ".concat(error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
startApp().then(function (result) { return console.log(result); });
exports.default = app;
