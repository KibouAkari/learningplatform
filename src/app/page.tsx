"use client";

import { useState, useEffect } from "react";
import { createContainer, deleteContainer } from "../utils/azureApi";
import { getAssignments } from "../utils/moodleApi";


export default function Home() {
  interface Assignment {
    id: number;
    name: string;
  }

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [containerId, setContainerId] = useState(null);

  useEffect(() => {
    async function fetchAssignments() {
      const data = await getAssignments(1); // Beispiel User ID
      if (data) setAssignments(data.assignments);
    }
    fetchAssignments();
  }, []);

  const handleStartContainer = async () => {
    setLoading(true);
    const container = await createContainer(image);
    if (container) setContainerId(container.id);
    setLoading(false);
  };

  const handleStopContainer = async () => {
    setLoading(true);
    await deleteContainer(containerId);
    setContainerId(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800">Lernplattform</h1>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold">Aufgaben aus Moodle</h2>
        <ul>
          {assignments.map((a) => (
            <li key={a.id} className="p-2 border-b">
              {a.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold">Container Management</h2>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image Name"
          className="border p-2 w-full"
        />
        <button
          onClick={handleStartContainer}
          className="mt-4 bg-blue-500 text-white p-2 rounded-lg w-full"
          disabled={loading}
        >
          {loading ? "Startet..." : "Container Starten"}
        </button>

        {containerId && (
          <button
            onClick={handleStopContainer}
            className="mt-2 bg-red-500 text-white p-2 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Stoppt..." : "Container Stoppen"}
          </button>
        )}
      </div>
    </div>
  );
}
