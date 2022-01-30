export interface TypedRequestBody<T> extends Express.Request {
	params: T;
}

export interface CommandRequest extends Express.Request {
	body: {
		userId: string;
		description?: string;
		command: "startUser" | "stopUser";
	};
}
