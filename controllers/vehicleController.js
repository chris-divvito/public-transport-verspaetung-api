const boom = require("boom");
const _ = require("lodash");
const ClosestPoint = require("../utils/closest-point");
const timestampCompare = require("../utils/timestamp-compare");

class VehicleController {
	constructor(data) {
		this.data = data;
		this.getNextVehicle = this.getNextVehicle.bind(this);
		this.getVehicleInformation = this.getVehicleInformation.bind(this);
		this.isLineDelayed = this.isLineDelayed.bind(this);
	}

	async getVehicleInformation(x, y, timestamp) {
		const {stops_loc} = await this.data.collection;
		try {
			const cp = ClosestPoint(stops_loc, x, y);
			const closest_point = cp.getClosestPoint();

			const {distance, points: [point]} = closest_point.closest_pair;

			const stop_index = _.findIndex(stops_loc, ({x, y}) => x === point.x && y === point.y);
			const stop = stops_loc[stop_index];
			const {next_line} = await this.getNextVechicle(stop.stop_id, timestamp);

			return {next_line, distance};
		} catch (err) {
			throw boom.boomify(err);
		}
	}

	async isLineDelayed(line_id) {
		const {timetable} = await this.data.collection;
		const index = _.findIndex(timetable, (o) => o.line_id === line_id);
		if (index === -1) {
			throw boom.boomify(new Error("Could not find line ID " + line_id));
		}
		const {delay} = timetable[index];
		const result = delay > 0;
		return {delay, result};
	}

	async getNextVehicle(stop_id, timestamp) {
		const {timetable} = await this.data.collection;
		const stopAndTimestampComparator = (s) => s.stop_id = stop_id && timestampCompare(timestamp, s.stop_time);
		const vehicles = _.filter(timetable, (tt) =>
			_.some(tt.stops, stopAndTimestampComparator)
		);

		return {
			next_line: _.map(vehicles, (v) => ({
				line_name: v.line_name,
				line_id: v.line_id,
				stops: _.filter(v.stops, stopAndTimestampComparator)
			}))};
	}

}

module.exports = VehicleController;
