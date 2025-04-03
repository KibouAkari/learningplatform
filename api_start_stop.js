const kubernetesApiUrl = `https://<kubernetes-api-server>/api/v1/namespaces/default/pods/mein-container`;

async function deleteContainer() {
  try {
    const response = await axios.delete(kubernetesApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Container gestoppt:", response.data);
  } catch (error) {
    console.error("Fehler beim Stoppen des Containers:", error);
  }
}

deleteContainer();
