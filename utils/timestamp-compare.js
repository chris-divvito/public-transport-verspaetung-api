// returns true if timestamp1 is later than timestamp2
module.exports = (timestamp1, timestamp2) => Date.parse(`01/01/2011 ${timestamp1}`) > Date.parse(`01/01/2011 ${timestamp2}`);