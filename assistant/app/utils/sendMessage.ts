import axios from "axios";
import "dotenv/config";

export async function sendMessage(args: any) {
  const { linkedinId } = args;
  const response = await axios.get(
    `http://ec2-18-216-224-206.us-east-2.compute.amazonaws.com:3000/connections/linkedin/${linkedinId}`
  );
  const user = response.data;
  console.log({ user });
  const chatResponse = await axios.post(
    "/api/sendMessage",
    { user },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { message } = chatResponse.data;

  console.log({ user, message });
  return { message };
}
