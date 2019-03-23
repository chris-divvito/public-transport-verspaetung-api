class Time {
	constructor({line_id, stop_id, time}, data) {
		this.lineId = parseInt(line_id, 10);
		this.stopId = parseInt(stop_id, 10);
		this.time = time;
		this.data = data;
		this.getLine = this.getLine.bind(this);
		this.getStop = this.getStop.bind(this);
	}

	async getLine() {
		return await this.data.getLineById(this.lineId);
	}

	async getStop() {
		return await this.data.getStopById(this.stopId);
	}

	toJSON() {
		return {
			line_id: this.lineId,
			stop_id: this.stopId,
			time: this.time,
		};
	}
}

module.exports = Time;