import express from "express";
import stopUser from "../../controllers/users/stopUserController";

const routes = express.Router({ mergeParams: true });
routes.post("/:userId", stopUser);
module.exports = routes;

/**
 * @swagger
 * /users/stopUser/{userId}:
 *   post:
 *     summary: Stop.
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
 *         description: Stopped.
 */
