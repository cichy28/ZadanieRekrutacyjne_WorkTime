import { raw, Request, Response } from "express";
import { prepareChartData } from "./getUserDataController";

const renderUserData = async (req: Request, res: Response): Promise<Response> => {
	const resData = await prepareChartData(req, res);
	res.render("chart", { title: "Main paige", chartData: resData, buttons: true });
	return res;
};
export default renderUserData;
