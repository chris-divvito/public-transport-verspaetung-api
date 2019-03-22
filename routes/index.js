const data = require("../data")();
const VehicleController = require("../controllers/vehicleController");
const vehicleController = new VehicleController(data);
const tsvalidator = require("../utils/timestamp-validator");
const {assertNumber, assertTruthy} = require("../utils/assertions");

async function routes(fastify) {
	fastify.get("/api/find_vehicle", async (request, response) => {
		try {
			let { query: {x, y, timestamp} } = request;
			assertNumber(x, "Please provide x as a number");
			assertNumber(y, "Please provide y as a number");
			assertTruthy(timestamp, "Please provide timestamp");
			tsvalidator(timestamp);
			return await vehicleController.getVehicleInformation(x, y, timestamp);
		} catch (err) {
			return response.status(400).send(err);
		}
	});

	fastify.get("/api/line_delay", async (request, response) => {
		try {
			const { query: line_id } = request;
			assertNumber(line_id, "Please provide a line id");
			return await vehicleController.isLineDelayed(parseInt(line_id, 10));
		} catch (err) {
			return response.status(400).send(err);
		}
	});

	fastify.get("/api/next_vehicle", async (request, response) => {
		try {
			let { query: {stop_id, timestamp} } = request;
			assertTruthy(stop_id, "Please provide stop_id");
			assertTruthy(timestamp, "Please provide timestamp");
			tsvalidator(timestamp);
			return await vehicleController.getNextVehicle(
				stop_id,
				timestamp
			);
		} catch (err) {
			return response.status(400).send(err);
		}
	});
}

module.exports = routes;
