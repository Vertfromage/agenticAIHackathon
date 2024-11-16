import axios from "axios";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { user } = await req.json();
  console.log({ user });
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    // Generate a message with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `I recently connected with ${user.name} at ${user.event} on ${user.date}. Please write a message thanking them for the connection.`,
        },
      ],
    });
    console.log(completion);
    const message = completion.choices[0].message.content;

    // Send the message back as a response
    return Response.json({ message });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" });
  }
}
