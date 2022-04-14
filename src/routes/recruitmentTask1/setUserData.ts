import express from "express";
import { setUserData } from "@src/controllers/recruitmentTask1/setUserDataController";

const setUserDataRoute = express.Router({ mergeParams: true });
setUserDataRoute.get("/", setUserData);
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
