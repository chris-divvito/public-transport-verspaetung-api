class Delay {
	constructor({line_name, delay}, data) {
		this.delay = parseInt(delay, 10);
		this.lineName = line_name;
		this.data = data;
		this.getLine = this.getLine.bind(this);
	}

	async getLine() {
		return await this.data.getLineByName(this.lineName);
	}

	toJSON() {
		return {
			line_name: this.lineName,
			delay: this.delay
		};
	}
}

module.exports = Delay;