import express from "express";
import { getUserData } from "@src/controllers/recruitmentTask1/getUserDataController";

const getUserDataRoute = express.Router({ mergeParams: true });
getUserDataRoute.get("/", getUserData);
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
