import express from "express";
import swaggerUi from "swagger-ui-express";
const bodyParser = require("body-parser");
import * as swaggerDocument from "./swagger.json";
import * as fs from "fs";

const port = 3000;
const app = express();
const mainRouter = require("./routes/mainRouter");
app.use(bodyParser.json({ extended: true }));
app.use("", mainRouter);

try {
	app.listen(port, (): void => {
		app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error: any) {
	console.error(`Error occured: ${error}`);
}
