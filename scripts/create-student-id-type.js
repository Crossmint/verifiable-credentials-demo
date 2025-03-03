const { truncate } = require("node:fs");

require("dotenv").config({ path: "../.env.local" });
const myApiKey = process.env.CROSSMINT_API_KEY;

const typeName = "StudentId";

const schema = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "StudentId",
	description: "Verifiable credential for student identification",
	type: "object",
	properties: {
		credentialSubject: {
			type: "object",
			properties: {
				firstName: {
					type: "string",
				},
				lastName: {
					type: "string",
				},
				studentId: {
					type: "string",
				},
				secret: {
					type: "string",
				},
				id: {
					type: "string",
				},
			},
			required: ["firstName", "lastName", "studentId", "secret"],
			additionalProperties: true,
		},
	},
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
	`https://staging.crossmint.com/api/v1-alpha1/credentials/types/${typeName}`,
	options,
)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));
