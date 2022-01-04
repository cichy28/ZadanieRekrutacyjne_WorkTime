require("dotenv").config();
import { app } from "./app";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
const port = process.env.PORT;

try {
	app.listen(port, (): void => {
		app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${error.message}`);
}
