const tsvalidator = require("../utils/timestamp-validator");
const {assertNumber, assertTruthy} = require("../utils/assertions");

module.exports = (vehicleController) => async (request) => {
	const { query: {x, y, timestamp} } = request;
	assertNumber(x, "Please provide x as a number");
	assertNumber(y, "Please provide y as a number");
	assertTruthy(timestamp, "Please provide timestamp");
	tsvalidator(timestamp);
	return await vehicleController.getVehicleInformation(x, y, timestamp);
};