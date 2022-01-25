import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/mainRouter");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = require("./swagger.json");

// Swager
const options = {
	swaggerDefinition,
	// Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
	apis: ["./src/routes/**/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

// Express
const port = 3000;
const app = express();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json({ extended: true }));
app.use("", mainRouter);

// MongoDB
const uri = "mongodb+srv://JC:JC123@cluster0.of2pn.mongodb.net/Recrutation_Task1?retryWrites=true&w=majority";

const startApp = async (): Promise<any> => {
	try {
		await mongoose.connect(uri);
		console.log("database connected");
		await app.listen(port);
		console.log("server started");
		return "App started correctly";
	} catch (error) {
		return `App stopped - ${error}`;
	}
};
startApp().then((result) => console.log(result));

export default app;
