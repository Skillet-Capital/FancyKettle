const { JsonRpcProvider } = require('ethers');
const { RPC_URL } = require('./constants');

const provider = new JsonRpcProvider(RPC_URL);

module.exports = { provider };
