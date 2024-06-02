const { parseUnits } = require('ethers');
const { kettle } = require('./kettle');
const { wallet } = require('./wallet');

const { CURRENCIES, TRAIT_ROOTS } = require('./constants');

const { getEpoch } = require('./utils');

/**
 * 
 * @param {Address} collection 
 * @param {TraitType} _trait one of "collection", "new", "used_mint", "used_mint_full_set"
 * @param {CurrencyType} _currency on of "USDC", "WETH"
 * @param {Number} amount raw unformatted amount -> 1 = 1 WETH
 * @param {Number} expiration time in seconds until the bid expires (added to current time)
 * @returns 
 */
async function createCollectionBid(collection, _trait, _currency, amount, expiration) {
  const _kettle = kettle.connect(wallet);

  const currency = CURRENCIES[_currency];
  const trait = TRAIT_ROOTS[_trait];

  if (!currency) {
    throw new Error('Invalid currency');
  }

  if (!trait) {
    throw new Error('Invalid trait');
  }
 
  const bid = {
    collection,
    itemType: 0,
    identifier: trait,
    criteria: 1,
    currency: currency,
    amount: parseUnits(amount.toString(), 18).toString(),
    fee: '0',
    recipient: '0x0000000000000000000000000000000000000000',
    expiration: getEpoch() + parseInt(expiration),
  };

  const steps = await _kettle.createBidOffer(bid);

  const createStep = steps.find((s) => s.type === 'create');
  const { type, offer, signature } = await createStep.createOrder();

  return {
    maker: await wallet.getAddress(),
    type,
    offer,
    signature
  }
}

module.exports = { createCollectionBid }
