import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Create a new assistant
export async function POST() {
  const assistant = await openai.beta.assistants.create({
    instructions: "You are a helpful assistant.",
    name: "Networking Assistant",
    model: "gpt-4o",
    tools: [
      {
        type: "function",
        function: {
          name: "recordConnection",
          description: "Record a new linkedIn connection event in the database.",
          parameters: {
            type: "object",
            properties: {
              linkedin_id: {
                type: "string",
                description: "The city and state e.g. San Francisco, CA",
              },
              name: {
                type: "string",
                description: "The name of the person you connected with.",
              },
              event: {
                type: "string",
                description: "The event that you connected with the person.",
              },
              date: {
                type: "string",
                description: "The date of the connection in ISO format.",
              },
            },
            required: ["linkedinId", "name", "event", "date"],
          },
        },
      },
    ],
  });
  return Response.json({ assistantId: assistant.id });
}
