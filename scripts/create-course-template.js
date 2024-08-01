require('dotenv').config({path:'../.env.local'});
const myApiKey = process.env.CROSSMINT_API_KEY;

const templateParams = {
  credentials: {
    // reference the id returned from the previous step, string should look like crossmint:<projectId>:<typeName>
    type: "TYPE_ID",
    encryption: "none",
    storage: "crossmint",
  },
  metadata: {
    name: "Shibatoshi University Courses",
    description: "Granted upon sucessful completion of a university course.",
    imageUrl:
      "https://bafybeicyd6jtl2tbcxcsu5et64nip5prcd5yrjcoja7tb3pablgctpjawm.ipfs.dweb.link/",
  },
  chain: "polygon-amoy",
};

const options = {
  method: "POST",
  headers: {
    "X-API-KEY": myApiKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(templateParams),
};

fetch(
  "https://staging.crossmint.com/api/v1-alpha1/credentials/templates/",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
