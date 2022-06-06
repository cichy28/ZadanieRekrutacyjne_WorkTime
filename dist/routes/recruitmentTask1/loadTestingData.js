"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loadTestingDataController_1 = require("@src/controllers/recruitmentTask1/loadTestingDataController");
var loadTestingDataRoute = express_1.default.Router({ mergeParams: true });
loadTestingDataRoute.get("/", loadTestingDataController_1.loadTestingData);
module.exports = loadTestingDataRoute;
/**
 * @swagger
 * /recruitmentTask1/loadTestingData:
 *   post:
 *     summary: 'Generate test data.'
 *     description: 'Generate test data. You can get example of data from public folder -'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               "$ref": "#/components/schemas/commandSchema"
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/commandSchema"
 */
