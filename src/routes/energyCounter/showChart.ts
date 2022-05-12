import express from "express";
import { showChart } from "@src/controllers/energyCounter/showChart";

const showChartRoute = express.Router({ mergeParams: true });
showChartRoute.get("/", showChart);
module.exports = showChartRoute;

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
