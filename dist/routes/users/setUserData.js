"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var setUserDataController_1 = __importDefault(require("../../controllers/users/setUserDataController"));
var routes = express_1.default.Router({ mergeParams: true });
routes.post("/", setUserDataController_1.default);
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
