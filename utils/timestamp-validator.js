const _ = require("lodash");

module.exports = timestamp => {
	const timeArr = _.split(timestamp, ":");

	if (timeArr.length !== 3) {
		throw new Error("Please provide timestamp as HH:MM:SS");
	}

	let hour = parseInt(timeArr[0], 10);
	let minute = parseInt(timeArr[1], 10);
	let second = parseInt(timeArr[2], 10);
	if (isNaN(hour) || isNaN(minute) || isNaN(second))
		throw new Error(
			"Please provide timestamp as numeric values in the format HH:MM:SS"
		);

	if (hour >= 24 || hour < 0 || timeArr[0].length !== 2)
		throw new Error("Please provide the hours in timestamp between 00 and 23");

	if (minute >= 60 || minute < 0 || timeArr[1].length !== 2)
		throw new Error(
			"Please provide the minutes in timestamp between 00 and 59"
		);

	if (second >= 60 || second < 0 || timeArr[2].length !== 2)
		throw new Error(
			"Please provide the seconds in timestamp between 00 and 59"
		);
};
