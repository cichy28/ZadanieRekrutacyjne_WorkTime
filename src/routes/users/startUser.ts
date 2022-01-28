import express from "express";
import startUser from "../../controllers/users/startUserController";

const routes = express.Router({ mergeParams: true });
routes.post("/:userId", startUser);
module.exports = routes;

/**
 * @swagger
 * /users/startUser/{userId}:
 *   post:
 *     summary: Start.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrription of task.
 *                 example: Coding...
 *     responses:
 *       200:
 *         description: Started.
 */
