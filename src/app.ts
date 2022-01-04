require("dotenv").config();

import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

const app: Application = express();
const port = process.env.PORT;

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "Hello World!",
	});
});

try {
	app.listen(port, (): void => {
		app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${error.message}`);
}
