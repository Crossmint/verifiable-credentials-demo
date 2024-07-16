const myApiKey = "sk_YOUR_SERVER_API_KEY";
const typeName = "Course";

const schema = {
  credentialSubjectSchema: [
    {
      name: "courseName",
      type: "string",
    },
    {
      name: "courseNumber",
      type: "uint16",
    },
    {
      name: "finalGrade",
      type: "uint8",
    },
    {
      name: "issueDate",
      type: "uint256",
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
