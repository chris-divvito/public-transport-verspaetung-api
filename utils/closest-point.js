const _ = require("lodash");

const ClosestPoint = (stops, x, y) => {
	const current_location = { x, y };
	const locations = _.map(stops, ({ x, y }) => ({ x, y }));

	function calculateDistance(p1, p2) {
		const dx = Math.abs(p1.x - p2.x);
		const dy = Math.abs(p1.y - p2.y);
		return Math.sqrt(dx * dx + dy * dy);
	}

	function calculateClosestPair(arr) {
		if (arr.length < 2) {
			return Infinity;
		} else {
			return _.reduce(arr, (result, point) => {
				const distance = calculateDistance(current_location, point);
				return !result || distance < result.distance
					? {distance, point}
					: result;
			}, null);
		}
	}

	const getClosestPoint = () => {
		let closest_pair = calculateClosestPair(locations);
		return { current_location, closest_pair };
	};

	return { getClosestPoint };
};

module.exports = ClosestPoint;
