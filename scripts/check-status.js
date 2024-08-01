require('dotenv').config({path:'../.env.local'});

const options = {method: 'GET', headers: {'X-API-KEY': process.env.CROSSMINT_API_KEY}};
// input the template ID to check if its pending or if its successfully onchain
const templateId = "TEMPLATE_ID";

fetch(`https://staging.crossmint.com/api/2022-06-09/actions/${templateId}`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));