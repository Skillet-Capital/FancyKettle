const { Kettle } = require('kettle-core-js');
const { provider } = require('./provider');

const { KETTLE_CONTRACT_ADDRESS, RPC_URL } = require('./constants');

const kettle = new Kettle(provider, KETTLE_CONTRACT_ADDRESS, RPC_URL);

module.exports = { kettle };
