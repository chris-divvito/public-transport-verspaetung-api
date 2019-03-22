const data = require("../data")();
const VehicleController = require("../controllers/vehicleController");
const errorHandling = require("./error-handing");
const findVehicle = require("./find-vehicle");
const nextVehicle = require("./next-vehicle");
const lineDelay = require("./line-delay");

async function routes(fastify) {
	const vehicleController = new VehicleController(data);
	fastify.get("/api/find_vehicle", errorHandling((findVehicle(vehicleController))));

	fastify.get("/api/line_delay", errorHandling(lineDelay(vehicleController)));

	fastify.get("/api/next_vehicle", errorHandling(nextVehicle(vehicleController)));
}

module.exports = routes;
