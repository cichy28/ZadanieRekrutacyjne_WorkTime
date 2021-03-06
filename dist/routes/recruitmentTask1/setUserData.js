"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var setUserDataController_1 = require("@src/controllers/recruitmentTask1/setUserDataController");
var setUserDataRoute = express_1.default.Router({ mergeParams: true });
setUserDataRoute.get("/", setUserDataController_1.setUserData);
module.exports = setUserDataRoute;
/**
 * @swagger
 * /recruitmentTask1/setUserData:
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
