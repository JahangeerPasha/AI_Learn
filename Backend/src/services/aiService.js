import fetch from "node-fetch";

export async function getAIRecommendations(preferences) {
  const prompt = `
You are an AI learning assistant.

User profile:
Level: ${preferences.level}
Interest: ${preferences.interest}
Goal: ${preferences.goal}
Daily Time: ${preferences.dailyTime}

Return:
1. 3 learning recommendations
2. A simple daily study plan

Respond in JSON only.
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}
