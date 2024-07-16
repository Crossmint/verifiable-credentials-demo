const myApiKey = "sk_YOUR_SERVER_API_KEY";

const templateParams = {
  credentials: {
    type: "crossmint:b2166c3f-5b93-4064-9d3c-9bb6be9b4f94:Course",
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
  "https://staging.crossmint.com/api/unstable/credentials/templates/",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
