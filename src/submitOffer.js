const axios = require('axios');

async function submitOffer(maker, type, offer, signature) {
  return axios({
    method: "post",
    url: "https://orderbook.kettle.fi/submitOffer", 
    data: {
      chain: "blast",
      maker,
      type,
      offer,
      signature
    }
  }).then((response) => response.data)
    .catch((error) => {
      console.error(error.response.data);
      return null;
    })
}

module.exports = { submitOffer };
