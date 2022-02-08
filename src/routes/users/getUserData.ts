import express from "express";
import getUserData from "../../controllers/users/getUserDataController";

const routes = express.Router({ mergeParams: true });
routes.get("/", getUserData);
module.exports = routes;

/**
 * @swagger
 * /users/getUserData:
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
