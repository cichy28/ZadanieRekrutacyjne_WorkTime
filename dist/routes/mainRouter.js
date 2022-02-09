"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mainRouter = express_1.default.Router({ mergeParams: true });
var getUserData = require("./users/getUserData");
var renderUserData = require("./users/renderUserData");
var loadTestingData = require("./users/loadTestingData");
var setUserData = require("./users/setUserData");
// Endppoints
mainRouter.use("/users/getUserData", getUserData);
mainRouter.use("/users/renderUserData", renderUserData);
mainRouter.use("/users/loadTestingData", loadTestingData);
mainRouter.use("/users/setUserData", setUserData);
mainRouter.get("/", function (req, res) {
    res.render("main", { title: "Main paige", buttons: true });
});
mainRouter.use("", function (req, res) {
    console.log("No enpoint like this");
    res.sendStatus(404);
});
module.exports = mainRouter;
