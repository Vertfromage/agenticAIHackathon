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
      {
        type: "function",
        function: {
          name: "recordConnection",
          description:
            "Record a new linkedIn connection event in the database.",
          parameters: {
            type: "object",
            properties: {
              linkedin_id: {
                type: "string",
                description:
                  "The linkedin id of the person you connected with.",
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
                type: "date",
                description:
                  "The date of the connection, converted to ISO format.",
              },
              notes: {
                type: "string",
                description:
                  "Any additional notes you would like to add about the connection.",
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
