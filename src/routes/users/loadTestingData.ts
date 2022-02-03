import express from "express";
import loadTestingData from "../../controllers/users/loadTestingDataController";

const routes = express.Router({ mergeParams: true });
routes.post("/", loadTestingData);
module.exports = routes;

/**
 * @swagger
 * /users/loadTestingData/{userId}:
 *   post:
 *     summary: Generate test data about user activity.
 *     description: Generate test data about user activity.
 *     parameters:
 *       - in: path
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
 *               "$ref": "#/components/schemas/Activity_time"
 */
