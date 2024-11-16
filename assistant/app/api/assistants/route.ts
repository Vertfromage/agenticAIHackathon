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
          name: "get_weather",
          description: "Determine weather in my location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "The city and state e.g. San Francisco, CA",
              },
              unit: {
                type: "string",
                enum: ["c", "f"],
              },
            },
            required: ["location"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "getSingleConnection",
          description: "getting the data from database using the LinkedIn ID",
          parameters: {
            type: "object",
            properties: {
              linkedInId: {
                type: "string",
                description: "ID",
              },
            },
            required: ["location"],
          },
        },
      },
    ],
  });
  return new Response(JSON.stringify({ assistantId: assistant.id }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
});}
