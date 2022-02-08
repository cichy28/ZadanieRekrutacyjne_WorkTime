import express from "express";
import setUserData from "../../controllers/users/setUserDataController";

const routes = express.Router({ mergeParams: true });
routes.post("/", setUserData);
module.exports = routes;

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
