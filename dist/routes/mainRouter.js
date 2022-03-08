"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
var express_1 = __importDefault(require("express"));
var mainRouter = express_1.default.Router({ mergeParams: true });
exports.mainRouter = mainRouter;
var getUserDataController_1 = require("@controllers/getUserDataController");
var renderUserDataController_1 = require("@controllers/renderUserDataController");
var loadTestingDataController_1 = require("@controllers/loadTestingDataController");
var setUserDataController_1 = require("@controllers/setUserDataController");
// Endppoints
mainRouter.use("/users/getUserData", getUserDataController_1.getUserData);
mainRouter.use("/users/renderUserData", renderUserDataController_1.renderUserData);
mainRouter.use("/users/loadTestingData", loadTestingDataController_1.loadTestingData);
mainRouter.use("/users/setUserData", setUserDataController_1.setUserData);
mainRouter.get("/", function (req, res) {
    res.render("main", { buttons: true });
});
mainRouter.use("", function (req, res) {
    console.log("No enpoint like this");
    res.sendStatus(404);
});
