const {assertNumber} = require("../utils/assertions");

module.exports = (vehicleController) => async (request) => {
	const { query: {line_id} } = request;
	assertNumber(line_id, "Please provide a line id");
	return await vehicleController.isLineDelayed(parseInt(line_id, 10));
};