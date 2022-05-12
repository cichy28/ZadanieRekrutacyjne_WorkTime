import express from "express";
import { DataModel, IDataFiles, ICsvRow } from "@models/energyCounter/dataFIles";

const mainRouter = express.Router();

const getUserDataRoute = require("@routes/recruitmentTask1/getUserData");
const renderUserDataRoute = require("@routes/recruitmentTask1/renderUserData");
const loadTestingDataRoute = require("@routes/recruitmentTask1/loadTestingData");
const setUserDataRoute = require("@routes/recruitmentTask1/setUserData");

const createTableRoute = require("@routes/energyCounter/createTable");
const uploadDataRoute = require("@routes/energyCounter/uploadData");
const sendRaportRoute = require("@routes/energyCounter/sendReport");
const showChartRoute = require("@routes/energyCounter/showChart");

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
mainRouter.use("/energyCounter/showChart", showChartRoute);

mainRouter.get("/energyCounter", async (req, res) => {
	const datasets = await DataModel.find({}, { data: 0 });
	console.log(datasets);
	res.render("energyCounter/main", { buttons: true, datasets: datasets });
});

{
}

mainRouter.get("/", (req, res) => {
	res.render("main", { buttons: true });
});

mainRouter.use("", (req, res) => {
	console.log("No enpoint like this");
	res.sendStatus(404);
});

export { mainRouter };
