const { createCollectionBid } = require('./createCollectionBid');
const { submitOffer } = require('./submitOffer');

async function main() {
  const trait = "new";
  const currency = "USDC";

  const amount = 1;

  const expiration = 60 * 60 * 24;

  const collection = "0x6c220490c8b3dff9bc2fdc3d679f49cb9db4eacc";

  const { maker, type, offer, signature } = await createCollectionBid(collection, trait, currency, amount, expiration);

  console.log(type, offer, signature);

  const response = await submitOffer(maker, type, offer, signature);

  console.log(response);


}

main();