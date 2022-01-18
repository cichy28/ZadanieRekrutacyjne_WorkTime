import express from "express";
import swaggerUi from "swagger-ui-express";

import * as fs from "fs";

const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const mainRouter = require("./routes/mainRouter");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = require("./swagger.json");
const options = {
	swaggerDefinition,
	// Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
	apis: ["./src/routes/**/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json({ extended: true }));
app.use("", mainRouter);

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error: any) {
	console.error(`Error occured: ${error}`);
}
