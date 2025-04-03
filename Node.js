const axios = require("axios");
const qs = require("qs");

const clientId = "a8cb8706-86da-431a-8810-f48c932a9b12";
const clientSecret = "qum8Q~V-w0KoqR_3GkJtmS1qkmtBoXDpuZPe8bR0";
const tenantId = "24b547dc-41f1-4776-9af2-e579a0d5eadb";

const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

const data = qs.stringify({
  client_id: clientId,
  client_secret: clientSecret,
  scope: "https://management.azure.com/.default",
  grant_type: "client_credentials",
});

async function getAccessToken() {
  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const accessToken = response.data.access_token;
    console.log("Access Token:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Fehler beim Abrufen des Tokens:", error);
  }
}

getAccessToken();
