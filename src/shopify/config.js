let axiosOptions = {
  method: 'POST',
  url: 'https://vapebluntmexico.myshopify.com/api/2021-01/graphql.json',
  headers: {
    'Content-Type': 'application/graphql',
    'Accept': 'application/json',
    'X-Shopify-Storefront-Access-Token': 'c94fcf8f54da3dbe4658a718ea3af568',
  },
}

module.exports = {
  axiosOptions
}