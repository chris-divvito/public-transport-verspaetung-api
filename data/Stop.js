const Point = require("./Point");

class Stop {
	constructor({stop_id, x, y}, data) {
		this.id = parseInt(stop_id, 10);
		this.point = new Point({x, y});
		this.data = data;
	}

	toJSON() {
		return {
			stop_id: this.id,
			x: this.point.x,
			y: this.point.y
		};
	}
}

module.exports = Stop;