import axios from 'axios';

export async function recordConnection(data: {
    linkedin_id: string;
    name: string;
    event: string;
    date: string; // ISO date format expected
  }) {
    // Validate input
  if (!data.linkedin_id || !data.name || !data.event || !data.date) {
    throw new Error('All fields (linkedinId, name, event, date) are required.');
  }

  try {
    // Make a POST request to the API
    const response = await axios.post('ec2-18-216-224-206.us-east-2.compute.amazonaws.com:3000/connections', data);
    return response.data;
  } catch (error) {
    console.error('Error saving connection:', error);
    throw error;
  }
  };
  