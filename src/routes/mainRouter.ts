import express from "express";

const mainRouter = express.Router({ mergeParams: true });

import { getUserData } from "@controllers/getUserDataController";
import { renderUserData } from "@controllers/renderUserDataController";
import { loadTestingData } from "@controllers/loadTestingDataController";
import { setUserData } from "@controllers/setUserDataController";

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
