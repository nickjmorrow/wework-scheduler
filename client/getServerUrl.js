const getServerUrl = () => {
	switch (process.env.NODE_ENV) {
		case "production":
			return "https://agile-reaches-55352.herokuapp.com/";
		case "development":
			return "http://localhost:3000";
		default:
			throw new Error(`Unexpected environment: ${process.env.NODE_ENV}`);
	}
	
}
// const getServerUrl = () => process.env.NOD_ENV === "development" ? "localhost:3000" : "https://agile-reaches-55352.herokuapp.com/"

// const getServerUrl = () => "http://localhost:3000";
module.exports = getServerUrl;