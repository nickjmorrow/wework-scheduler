export abstract class HTTPClientError extends Error {
	public readonly statusCode!: number;
	public readonly name!: string;

	public constructor(message: object | string) {
		if (message instanceof Object) {
			super(JSON.stringify(message));
		} else {
			super(message);
		}
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class HTTP400Error extends HTTPClientError {
	public readonly statusCode = 400;

	public constructor(message: string | object = 'Bad Request') {
		super(message);
	}
}

export class HTTP404Error extends HTTPClientError {
	public readonly statusCode = 404;

	public constructor(message: string | object = 'Not found') {
		super(message);
	}
}
