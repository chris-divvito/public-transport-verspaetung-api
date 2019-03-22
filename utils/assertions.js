module.exports = {
	assertNumber: (test, errorString) => {
		if (isNaN(parseInt(test, 10))) {
			throw new Error(errorString);
		}
	},
	assertTruthy: (test, errorString) => {
		if (!test) {
			throw new Error(errorString);
		}
	}
};