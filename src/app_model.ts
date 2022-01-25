export interface TypedRequestBody<T> extends Express.Request {
	params: T;
}

export interface CommandRequest extends Express.Request {
	params: { userId: string; command: string };
	body: {
		description: string;
	};
}