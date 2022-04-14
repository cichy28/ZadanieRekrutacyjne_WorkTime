import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import multer from "multer";
import { mainRouter } from "@src/routes/mainRouter";

const { MongoClient } = require("mongodb");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = require("../swagger.json");
const expressValidator = require("express-validator");

// Swager
const swagerOptions = {
	swaggerDefinition,
	// Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
	apis: ["./src/routes/**/*.ts"],
};
const swaggerSpec = swaggerJSDoc(swagerOptions);

// Express
let port = process.env.PORT;
if (port == null || port == "") {
	port = "3000";
}
const app = express();
// Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Logger
app.use(morgan("dev"));
// Public files
app.use(express.static("public"));
// Encoding
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("", mainRouter);
// View engine
app.set("view engine", "ejs");
app.set("views", "./src/views");
// MongoDB
const uri = "mongodb+srv://JC:JC123@cluster0.of2pn.mongodb.net/Task_TimeWork?retryWrites=true&w=majority";
// Multer
const upload = multer({ dest: "uploads/" });

var storage = multer.diskStorage({
	destination: (req, file, callBack) => {
		callBack(null, "./uploads/");
	},
	filename: (req, file, callBack) => {
		callBack(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	},
});

const startApp = async (): Promise<any> => {
	try {
		await mongoose.connect(uri);
		console.log("database connected");
		await app.listen(port);
		console.log("server started");
		return "App started correctly - localhost port " + port;
	} catch (error) {
		return `App stopped - ${error}`;
	}
};
startApp().then((result) => console.log(result));

export default app;
