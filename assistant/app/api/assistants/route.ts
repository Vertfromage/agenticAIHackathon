import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Create a new assistant
export async function POST() {
  const assistant = await openai.beta.assistants.create({
    instructions:
      "You are a helpful assistant for managing LinkedIn connections.",
    name: "Networking Assistant",
    model: "gpt-4o",
    tools: [
      {
        type: "function",
        function: {
          name: "sendMessage",
          description:
            "Send a connection or followup message to a LinkedIn user",
          parameters: {
            type: "object",
            properties: {
              linkedinId: {
                type: "string",
                description: "The LinkedIn user's ID",
              },
            },
            required: ["linkedinId"],
          },
        },
      },
    ],
  });
  return Response.json({ assistantId: assistant.id });
}
