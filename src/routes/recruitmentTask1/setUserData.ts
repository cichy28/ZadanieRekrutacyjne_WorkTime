import express from "express";
import { setUserData } from "@src/controllers/recruitmentTask1/setUserDataController";

export const routes = express.Router({ mergeParams: true });
routes.post("/", setUserData);

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
