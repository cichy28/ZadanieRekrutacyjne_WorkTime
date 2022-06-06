"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var renderUserDataController_1 = require("@src/controllers/recruitmentTask1/renderUserDataController");
var renderUserDataRoute = express_1.default.Router({ mergeParams: true });
renderUserDataRoute.get("/", renderUserDataController_1.renderUserData);
module.exports = renderUserDataRoute;
