import express from "express";

const mainRouter = express.Router({ mergeParams: true });

import { getUserData } from "@src/controllers/recruitmentTask1/getUserDataController";
import { renderUserData } from "@src/controllers/recruitmentTask1/renderUserDataController";
import { loadTestingData } from "@src/controllers/recruitmentTask1/loadTestingDataController";
import { setUserData } from "@src/controllers/recruitmentTask1/setUserDataController";

// Endppoints
mainRouter.use("/users/getUserData", getUserData);
mainRouter.use("/users/renderUserData", renderUserData);
mainRouter.use("/users/loadTestingData", loadTestingData);
mainRouter.use("/users/setUserData", setUserData);

mainRouter.get("/", (req, res) => {
	res.render("main", { buttons: true });
});

mainRouter.use("", (req, res) => {
	console.log("No enpoint like this");
	res.sendStatus(404);
});

export { mainRouter };
