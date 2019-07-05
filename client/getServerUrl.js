const getServerUrl = () => {
	switch (process.env.NODE_ENV) {
		case 'production':
			return 'https://fierce-sierra-91208.herokuapp.com/';
		case 'development':
			return 'http://localhost:9000/';
		default:
			throw new Error(`Unexpected environment: ${process.env.NODE_ENV}`);
	}
};

module.exports = getServerUrl;
