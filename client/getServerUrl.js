const getServerUrl = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return 'https://fierce-sierra-91208.herokuapp.com/';
		case 'x':
			return 'http://localhost:9000/';
		default:
			throw new Error(`Unexpected environment: ${process.env.NODE_ENV}`);
	}
};

module.exports = getServerUrl;
