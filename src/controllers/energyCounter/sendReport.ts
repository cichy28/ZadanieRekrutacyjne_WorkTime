import { raw, Request, Response } from "express";
import { ICommand, ICommandBaseDocument, CommandModel } from "@models/recruitmentTask1/commands";
import { body } from "express-validator";
import { PythonShell } from "python-shell";

const transporter = require("@classes/mailSender");

export const sendReport = async function (req: Request, res: Response, next: Function): Promise<Response> {
	return res.status(200).send("Table created");
};

const prepareData = () => {};

const runCalculatingScript = () => {
	const pythonOptions = {
		pythonOptions: ["-u"], // get print results in real-time
		scriptPath: "energyCalculator/src",
		args: ["value1", "value2", "value3"],
	};

	let pyshell = PythonShell.run("createTimeTable.py", pythonOptions);

	pyshell.on("message", function (message) {
		console.log(message);
	});

	pyshell.end(function (err, code, signal) {
		if (err) throw err;
		console.log("The exit code was: " + code);
		console.log("The exit signal was: " + signal);
		console.log("Success");
	});
};

const sendMail = (email: string) => {
	const message = {
		from: "JakisMeil - config",
		to: email,
		subject: "JCJCJC - RAPORT",
		text: "Raport - beta",
	};
	transporter.sendMail(message, function (err, info) {
		if (err) {
			return res.send(err);
		} else {
			return res.send(info);
		}
	});
};
