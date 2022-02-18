"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = __importDefault(require("express"));
var setUserDataController_1 = require("@src/controllers/users/setUserDataController");
exports.routes = express_1.default.Router({ mergeParams: true });
exports.routes.post("/", setUserDataController_1.setUserData);
/**
 * @swagger
 * /users/setUserData:
 *   post:
 *     summary: Start.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             "$ref": "#/components/schemas/commandSchema"
 *     responses:
 *       200:
 *         description: Started.
 */
