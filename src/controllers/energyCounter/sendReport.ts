import { raw, Request, Response } from "express";
import { ICommand, ICommandBaseDocument, CommandModel } from "@models/recruitmentTask1/commands";
import { body } from "express-validator";

const transporter = require("@classes/mailSender");
export const sendReport = function (req: Request, res: Response, next: Function): Promise<Response> {
	const message = {
		from: "JakisMeil - config",
		to: req.body.email,
		subject: "JCJCJC - RAPORT",
		text: "Testowa wiadomomość",
	};
	transporter.sendMail(message, function (err, info) {
		if (err) {
			return res.send(err);
		} else {
			return res.send(info);
		}
	});
};
