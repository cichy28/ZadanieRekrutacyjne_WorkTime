"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getUserDataController_1 = require("@src/controllers/recruitmentTask1/getUserDataController");
var getUserDataRoute = express_1.default.Router({ mergeParams: true });
getUserDataRoute.get("/", getUserDataController_1.getUserData);
module.exports = getUserDataRoute;
/**
 * @swagger
 * /recruitmentTask1/getUserData:
 *   get:
 *     summary: Get data for chart.
 *     description: Take data about user activity..
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/chartSchema"
 */
