const myApiKey = "sk_YOUR_SERVER_API_KEY";

const templateParams = {
  credentials: {
    type: "crossmint:b2166c3f-5b93-4064-9d3c-9bb6be9b4f94:StudentId",
    encryption: "none",
    storage: "crossmint",
  },
  metadata: {
    name: "Shibatoshi University Credentials",
    description: "Used to access university programs, campuses, and platforms.",
    imageUrl:
      "https://sapphire-controlled-herring-537.mypinata.cloud/ipfs/QmUi84qorq5CBi8AUn5JpX77BPP9ARkkWdssfFNpSsRU86",
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
