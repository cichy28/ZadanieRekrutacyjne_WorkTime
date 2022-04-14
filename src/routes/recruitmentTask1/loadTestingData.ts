import express from "express";
import { loadTestingData } from "@src/controllers/recruitmentTask1/loadTestingDataController";

const loadTestingDataRoute = express.Router({ mergeParams: true });
loadTestingDataRoute.get("/", loadTestingData);
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
