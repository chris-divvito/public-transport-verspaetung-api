const _ = require("lodash");

class Point {
	constructor({x, y}) {
		this.x = parseInt(x, 10);
		this.y = parseInt(y, 10);
	}

	distanceTo({x, y}) {
		const dx = Math.abs(this.x - x);
		const dy = Math.abs(this.y - y);
		return Math.sqrt(dx * dx + dy * dy);
	}

	closest(...points) {
		return _.reduce(points, (result, point) => {
			const distance = this.distanceTo(point);
			return !result || distance < result.distance
				? {distance, point}
				: result;
		}, null);
	}

	closestByProp(prop, ...items) {
		return _.reduce(items, (result, item) => {
			const distance = this.distanceTo(_.get(item, prop));
			return !result || distance < result.distance
				? {distance, item}
				: result;
		}, null);
	}
}

module.exports = Point;