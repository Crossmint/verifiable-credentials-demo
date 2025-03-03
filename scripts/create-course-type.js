require("dotenv").config({ path: "../.env.local" });
const myApiKey = process.env.CROSSMINT_API_KEY;

const typeName = "Course";

const schema = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "Course completion",
	description: "Describes the course completed and the assigned grade",
	type: "object",
	properties: {
		credentialSubject: {
			type: "object",
			properties: {
				courseName: {
					type: "string",
				},
				courseNumber: {
					type: "integer",
				},
				finalGrade: {
					type: "integer",
				},
				issueDate: {
					type: "integer",
				},
				id: {
					type: "string",
				},
			},
			required: ["courseName", "courseNumber", "finalGrade", "issueDate"],
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
