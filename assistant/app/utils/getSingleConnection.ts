import axios from 'axios';

interface PersonData {
    name: string;
    linkedin_id: string;
    event: string;
    date: string;
}

async function getSingleConnection(linkedin_id: string): Promise<PersonData | null> {
    try {
        // Replace 'https://your-api-endpoint.com/data' with your actual API endpoint
        const response = await axios.get<PersonData>(`ec2-18-216-224-206.us-east-2.compute.amazonaws.com:3000/connections/linkedin/crystal-parker-ns`, {
            params: { linkedin_id }
        });

        if (response.data) {
            console.log("Data retrieved successfully:", response.data);
            return response.data;
        } else {
            console.warn("No data found for the provided LinkedIn ID.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}