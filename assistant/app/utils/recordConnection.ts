import axios from "axios";

export async function recordConnection(data: {
  linkedin_id: string;
  name: string;
  event: string;
  date: Date; // ISO date format expected
}) {
  const { linkedin_id, name, event, date } = data;
  // Validate input
  if (!linkedin_id || !name || !event || !date) {
    throw new Error("All fields (linkedinId, name, event, date) are required.");
  }

  try {
    // Make a POST request to the API
    const response = await axios.post(
      "http://ec2-18-216-224-206.us-east-2.compute.amazonaws.com:3000/connections",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error saving connection:", error);
    throw error;
  }
}
