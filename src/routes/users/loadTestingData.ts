import express from "express";
import { loadTestingData } from "@src/controllers/users/loadTestingDataController";

export const routes = express.Router({ mergeParams: true });
routes.post("/", loadTestingData);

/**
 * @swagger
 * /users/loadTestingData:
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
