import Groq from "groq-sdk";

let groq;

function getGroqClient() {
  if (!groq) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groq;
}

export default async function getAIResponse(message, context = "") {
  const client = getGroqClient();

  const completion = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: `You are a helpful AI tutor. ${context}` },
      { role: "user", content: message },
    ],
  });

  return completion.choices[0].message.content;
}
