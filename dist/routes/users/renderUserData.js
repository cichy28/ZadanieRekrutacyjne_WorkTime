"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = __importDefault(require("express"));
var renderUserDataController_1 = require("@src/controllers/users/renderUserDataController");
exports.routes = express_1.default.Router({ mergeParams: true });
exports.routes.get("/", renderUserDataController_1.renderUserData);
