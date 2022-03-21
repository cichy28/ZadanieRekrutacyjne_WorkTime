import { ICommand } from "@models/recruitmentTask1/commands";

export interface TypedRequestBody<T> extends Express.Request {
	params: T;
}

export interface CommandRequest extends Express.Request {
	body: ICommand;
}
