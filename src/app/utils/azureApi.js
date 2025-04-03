import axios from "axios";
import qs from "qs";

const clientId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_AZURE_CLIENT_SECRET;
const tenantId = process.env.NEXT_PUBLIC_AZURE_TENANT_ID;
const subscriptionId = process.env.NEXT_PUBLIC_AZURE_SUBSCRIPTION_ID;
const resourceGroup = process.env.NEXT_PUBLIC_AZURE_RESOURCE_GROUP;
const clusterName = process.env.NEXT_PUBLIC_AZURE_CLUSTER_NAME;

// Hole Access Token
async function getAccessToken() {
  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const data = qs.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://management.azure.com/.default",
    grant_type: "client_credentials",
  });

  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Fehler beim Abrufen des Tokens:", error);
    return null;
  }
}

// Erstelle einen Container
async function createContainer(imageName) {
  const token = await getAccessToken();
  if (!token) return null;

  const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.ContainerService/managedClusters/${clusterName}/start?api-version=2023-05-01`;

  try {
    const response = await axios.post(
      url,
      { image: imageName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fehler beim Erstellen des Containers:", error);
  }
}

// Stoppe und lösche einen Container
async function deleteContainer(containerId) {
  const token = await getAccessToken();
  if (!token) return null;

  const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.ContainerService/managedClusters/${clusterName}/containers/${containerId}?api-version=2023-05-01`;

  try {
    await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true };
  } catch (error) {
    console.error("Fehler beim Löschen des Containers:", error);
    return { success: false };
  }
}

export { getAccessToken, createContainer, deleteContainer };
