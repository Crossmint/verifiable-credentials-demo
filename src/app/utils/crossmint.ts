const crossmintBaseUrl = process.env.CROSSMINT_API_URL;

const crossmintAPIHeaders = {
  accept: "application/json",
  "content-type": "application/json",
  "x-api-key": process.env.CROSSMINT_API_KEY!,
};

const callCrossmintAPI = async (
  endpoint: string,
  options: { method: string; body?: any; params?: any }
) => {
  let url = `${crossmintBaseUrl}/${endpoint}`;

  // if (options.params && options.method.toUpperCase() === "GET") {
  //   const params = new URLSearchParams(options.params).toString();
  //   url = `${url}?${params}`;
  // }

  const { body, method } = options;

  const response = await fetch(url, {
    body: body ? JSON.stringify(body) : null,
    method,
    headers: crossmintAPIHeaders,
  });
  const json = await response.json();
  return json;
};

export { callCrossmintAPI };
