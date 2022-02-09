"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var renderUserDataController_1 = __importDefault(require("../../controllers/users/renderUserDataController"));
var routes = express_1.default.Router({ mergeParams: true });
routes.get("/", renderUserDataController_1.default);
module.exports = routes;
