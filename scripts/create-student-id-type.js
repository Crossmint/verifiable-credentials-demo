const myApiKey = "sk_YOUR_SERVER_API_KEY";
const typeName = "StudentId";

const schema = {
  credentialSubjectSchema: [
    {
      name: "firstName",
      type: "string",
    },
    {
      name: "lastName",
      type: "string",
    },
    {
      name: "studentId",
      type: "string",
    },
    {
      name: "secret",
      type: "string",
    },
  ],
};
const options = {
  method: "PUT",
  headers: {
    "X-API-KEY": myApiKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(schema),
};

fetch(
  `https://staging.crossmint.com/api/unstable/credentials/types/${typeName}`,
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
