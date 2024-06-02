const { Wallet } = require('ethers');
const { provider } = require('./provider');

const { PRIVATE_KEY } = require('./constants');

const wallet = new Wallet(PRIVATE_KEY, provider);

module.exports = { wallet };
