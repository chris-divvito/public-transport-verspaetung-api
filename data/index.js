const csv = require("csvtojson");
const _ = require("lodash");
const Line = require("./Line");
const Delay = require("./Delay");
const Stop = require("./Stop");
const Time = require("./Time");

class Data {
	constructor() {
		this.load = this.load.bind(this);
		this.getLines = this.getLines.bind(this);
		this.getStopTimes = this.getStopTimes.bind(this);
		this.getStops = this.getStops.bind(this);
		this.getDelays = this.getDelays.bind(this);
		this.instantiateFromCsv = this.instantiateFromCsv.bind(this);
		this.getLineById = this.getLineById.bind(this);
		this.getStopById = this.getStopById.bind(this);
		this.getStopsToLines = this.getStopsToLines.bind(this);
		this.getTimesByLineIdAndStopId = this.getTimesByLineIdAndStopId.bind(this);
	}

	async load() {
		await Promise.all([
			this.getLines(),
			this.getStopTimes(),
			this.getStops(),
			this.getDelays()
		]);

		await this.getStopsToLines();
	}


	async getLines() {
		if (!this.lines) {
			this.lines = await this.instantiateFromCsv("lines.csv", Line);
		}
		return this.lines;
	}

	async getStopTimes() {
		if (!this.stopTimes) {
			this.stopTimes = await this.instantiateFromCsv("times.csv", Time);
		}
		return this.stopTimes;
	}

	async getStops() {
		if (!this.stops) {
			this.stops = await this.instantiateFromCsv("stops.csv", Stop);
		}
		return this.stops;
	}

	async getDelays() {
		if (!this.delays) {
			this.delays = await this.instantiateFromCsv("delays.csv", Delay);
		}
		return this.delays;
	}

	async getStopsToLines() {
		if (!this.stopsToLines) {
			this.stopsToLines = await this.calculateStopsToLines("delays.csv", Delay);
		}
		return this.stopsToLines;
	}

	async calculateStopsToLines() {
		await this.getStopTimes();
		const result = {};
		for (let {stopId, lineId} of this.stopTimes) {
			if (!result.hasOwnProperty(stopId)) {
				result[stopId] = new Set();
			}
			result[stopId].add(await this.getLineById(lineId));
		}

		return result;
	}

	async instantiateFromCsv(fileName, Class) {
		const jsonObj = await csv().fromFile(__dirname + "/" + fileName);
		return _.map(jsonObj, (data) => new Class(data, this));
	}

	async getLineById(id) {
		await this.getLines();
		return _.find(this.lines, ["id", id]);
	}

	async getLineByName(name) {
		await this.getLines();
		return _.find(this.lines, ["name", name]);
	}

	async getStopById(id) {
		await this.getStops();
		return _.find(this.stops, ["id", id]);
	}

	async getDelayByLineName(name) {
		await this.getDelays();
		return _.find(this.delays, ["lineName", name]);
	}

	async getTimesByLineId(id) {
		await this.getStopTimes();
		return _.filter(this.stopTimes, ["lineId", id]);
	}

	async getTimesByLineIdAndStopId(lineId, stopId) {
		await this.getStopTimes();
		return _.filter(this.stopTimes, ({stopId: thisStopId, lineId: thisLineId}) =>
			stopId === thisStopId && lineId === thisLineId
		);
	}
}

module.exports = Data;