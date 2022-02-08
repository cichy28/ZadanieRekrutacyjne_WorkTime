import { command } from "../models/commands";

export interface TypedRequestBody<T> extends Express.Request {
	params: T;
}

export interface CommandRequest extends Express.Request {
	body: command;
}
