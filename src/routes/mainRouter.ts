import express from "express";

const mainRouter = express.Router();

const getUserDataRoute = require("@routes/recruitmentTask1/getUserData");
const renderUserDataRoute = require("@routes/recruitmentTask1/renderUserData");
const loadTestingDataRoute = require("@routes/recruitmentTask1/loadTestingData");
const setUserDataRoute = require("@routes/recruitmentTask1/setUserData");

const createTableRoute = require("@routes/energyCounter/createTable");
const uploadDataRoute = require("@routes/energyCounter/uploadData");
const sendRaportRoute = require("@routes/energyCounter/sendReport");

// Endppoints
mainRouter.use("/recruitmentTask1/getUserData", getUserDataRoute);
mainRouter.use("/recruitmentTask1/renderUserData", renderUserDataRoute);
mainRouter.use("/recruitmentTask1/loadTestingData", loadTestingDataRoute);
mainRouter.use("/recruitmentTask1/setUserData", setUserDataRoute);

mainRouter.get("/recruitmentTask1", (req, res) => {
	res.render("recruitmentTask1/main", { buttons: true });
});

mainRouter.use("/energyCounter/createTable", createTableRoute);
mainRouter.use("/energyCounter/uploadData", uploadDataRoute);
mainRouter.use("/energyCounter/sendReport", sendRaportRoute);

mainRouter.get("/energyCounter", (req, res) => {
	res.render("energyCounter/main", { buttons: true });
});

mainRouter.get("/", (req, res) => {
	res.render("main", { buttons: true });
});

mainRouter.use("", (req, res) => {
	console.log("No enpoint like this");
	res.sendStatus(404);
});

export { mainRouter };
