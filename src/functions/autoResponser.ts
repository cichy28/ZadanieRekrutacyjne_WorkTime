import { splitTimeObject, isOfType } from "../types/main.types";
import { raw, Request, Response } from "express";
import { Interface } from "readline";

function autoResponser(res: Response, objToCheck: unknown, type: Interface): Response | null {
	if (!isOfType<splitTimeObject>(objToCheck, "beginDate")) return res.status(200).send("No beginDate in re");
	return null;
}

export default autoResponser;
