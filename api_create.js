const accessToken = await getAccessToken(); // Hier rufst du das Access Token ab

// Azure Kubernetes API URL für das Erstellen eines Pods
const apiUrl = `https://management.azure.com/subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Kubernetes/connectedClusters/<aks-cluster-name>/runCommand?api-version=2021-08-01`;

const podSpec = {
  // YAML oder JSON-Definition des Containers
  apiVersion: "v1",
  kind: "Pod",
  metadata: { name: "mein-container" },
  spec: {
    containers: [
      {
        name: "mein-container",
        image: "mein-docker-image", // Dein Docker-Image
        ports: [{ containerPort: 80 }],
      },
    ],
  },
};

async function createContainer() {
  try {
    const response = await axios.post(apiUrl, podSpec, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Container erstellt:", response.data);
  } catch (error) {
    console.error("Fehler beim Erstellen des Containers:", error);
  }
}

createContainer();
