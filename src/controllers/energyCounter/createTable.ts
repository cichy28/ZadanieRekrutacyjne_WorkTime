import { raw, Request, Response } from "express";
import { ICommand, ICommandBaseDocument, CommandModel } from "@models/recruitmentTask1/commands";
import { PythonShell } from "python-shell";

let pythonOptions = {
	pythonOptions: ["-u"], // get print results in real-time
	scriptPath: "energyCalculator/src",
	args: ["value1", "value2", "value3"],
};

export const createTable = async function (req: Request, res: Response): Promise<Response> {
	let pyshell = PythonShell.run("createTimeTable.py", pythonOptions);

	pyshell.on("message", function (message) {
		// received a message sent from the Python script (a simple "print" statement)
		console.log(message);
	});

	pyshell.end(function (err, code, signal) {
		if (err) throw err;
		console.log("The exit code was: " + code);
		console.log("The exit signal was: " + signal);
		console.log("Success");
		return res.status(200).send("Table created");
	});
};
