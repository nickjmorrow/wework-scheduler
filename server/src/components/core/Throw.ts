/* tslint:disable:max-classes-per-file */
/* tslint:disable:member-access */
class NotImplementedException extends Error {
	public readonly name: string;
	public constructor() {
		super();
		this.name = 'NotImplementedException';
		Object.setPrototypeOf(this, NotImplementedException.prototype);
	}
}

class ShouldNeverGetHereException extends Error {
	public readonly name: string;

	public constructor() {
		super();
		this.name = 'ShouldNeverGetHereException';
		Object.setPrototypeOf(this, ShouldNeverGetHereException.prototype);
	}
}

class ArgumentException extends Error {
	public readonly name: string;
	public readonly message: string;

	public constructor(message: string) {
		super(message);
		this.name = 'ArgumentException';
		this.message = message;
	}
}

export class Throw {
	public static if: (condition: boolean, message: string) => void = (condition, message) => {
		if (condition) {
			throw new ArgumentException(message);
		}
	};

	public static ifNull: (obj: any, message?: string) => void = (obj, message) => {
		if (obj === null || obj === undefined) {
			// TODO: this seems messy
			throw new ArgumentException(message || '');
		}
	};

	public static notImplementedException: () => never = () => {
		throw new NotImplementedException();
	};

	public static shouldNeverGetHereException: () => never = () => {
		throw new ShouldNeverGetHereException();
	};
}
