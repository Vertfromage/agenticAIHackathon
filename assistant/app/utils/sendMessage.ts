import axios from "axios";
import OpenAI from "openai";

export function sendMessage(linkedinId: string) {
  // const openai = new OpenAI();
  const user = axios.get(
    `http://localhost:3001/connection/linkedin/${linkedinId}`
  );
  console.log(user);
}
