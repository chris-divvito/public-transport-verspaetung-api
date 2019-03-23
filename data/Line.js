class Line {
	constructor({line_id, line_name}, data) {
		this.id = parseInt(line_id, 10);
		this.name = line_name;
		this.data = data;
		this.getTimes = this.getTimes.bind(this);
		this.getTimesAtStop = this.getTimesAtStop.bind(this);
		this.getDelay = this.getDelay.bind(this);
	}

	async getTimes() {
		return await this.data.getTimesByLineId(this.id);
	}

	async getTimesAtStop(stopId) {
		return await this.data.getTimesByLineIdAndStopId(this.id, stopId);
	}

	async getDelay() {
		return await this.data.getDelayByLineName(this.name);
	}

	toJSON() {
		return {
			line_name: this.name,
			line_id: this.id
		};
	}
}

module.exports = Line;