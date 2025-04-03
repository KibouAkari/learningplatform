import axios from "axios";

const MOODLE_API_URL = process.env.NEXT_PUBLIC_MOODLE_API_URL;
const MOODLE_TOKEN = process.env.NEXT_PUBLIC_MOODLE_API_TOKEN;

// Hole Aufgaben aus Moodle
async function getAssignments(userId) {
  try {
    const response = await axios.get(
      `${MOODLE_API_URL}/webservice/rest/server.php`,
      {
        params: {
          wstoken: MOODLE_TOKEN,
          wsfunction: "mod_assign_get_assignments",
          moodlewsrestformat: "json",
          userid: userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Aufgaben:", error);
    return null;
  }
}

// Markiere eine Aufgabe als erledigt
async function completeAssignment(assignmentId) {
  try {
    const response = await axios.post(
      `${MOODLE_API_URL}/webservice/rest/server.php`,
      null,
      {
        params: {
          wstoken: MOODLE_TOKEN,
          wsfunction: "mod_assign_set_submission_status",
          moodlewsrestformat: "json",
          assignmentid: assignmentId,
          status: "submitted",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fehler beim Markieren der Aufgabe:", error);
    return null;
  }
}

export { getAssignments, completeAssignment };
