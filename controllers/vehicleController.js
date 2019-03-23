const boom = require("boom");
const _ = require("lodash");
const timestampCompare = require("../utils/timestamp-compare");
const Point = require("../data/Point");

class VehicleController {
	constructor(data) {
		this.data = data;
		this.getNextVehicle = this.getNextVehicle.bind(this);
		this.getVehicleInformation = this.getVehicleInformation.bind(this);
		this.isLineDelayed = this.isLineDelayed.bind(this);
	}

	// x and y should be int, timestamp a string
	async getVehicleInformation(x, y, timestamp) {
		try {
			const stops = await this.data.getStops();
			const currentLocation = new Point({x, y});

			const closestStop = currentLocation.closestByProp("point", ...stops);

			const {distance, item: stop} = closestStop;
			const {next_line} = await this.getNextVehicle(stop.id, timestamp);

			return {next_line, distance};
		} catch (err) {
			throw boom.boomify(err);
		}
	}

	// lineId should be int
	async isLineDelayed(lineId) {
		const line = await this.data.getLineById(lineId);

		if (!line) {
			throw new Error(`Could not find line ID ${lineId}`);
		}

		const delay = await line.getDelay();

		return {
			result: !!delay,
			delay: (delay && delay.delay) || 0
		};
	}

	// stopId should be int, timestamp a string
	async getNextVehicle(stopId, timestamp) {
		const stopsToLines = await this.data.getStopsToLines();
		const lines = stopsToLines[stopId] || [];
		const next_line = [];

		for (let line of lines) {
			const times = await line.getTimesAtStop(stopId);
			next_line.push({
				line_name: line.name,
				line_id: line.id,
				stops: _.filter(times, ({time}) => timestampCompare(time, timestamp))
			});
		}

		return {next_line};
	}

}

module.exports = VehicleController;
