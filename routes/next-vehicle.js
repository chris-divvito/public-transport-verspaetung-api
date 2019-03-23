const tsvalidator = require("../utils/timestamp-validator");
const {assertTruthy} = require("../utils/assertions");

module.exports = (vehicleController) => async (request) => {
	const { query: {stop_id, timestamp} } = request;
	assertTruthy(stop_id, "Please provide stop_id");
	assertTruthy(timestamp, "Please provide timestamp");
	tsvalidator(timestamp);
	return await vehicleController.getNextVehicle(parseInt(stop_id), timestamp);
};