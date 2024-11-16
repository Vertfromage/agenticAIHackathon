import axios from "axios";
import OpenAI from "openai";

export async function sendMessage(args: any) {
  const { linkedinId } = args;
  // const openai = new OpenAI();
  const user = await axios.get(
    `http://ec2-18-216-224-206.us-east-2.compute.amazonaws.com:3000/connections/linkedin/${linkedinId}`
  );
  console.log({ user });
  return user;
}
