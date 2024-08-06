import { getApiKey } from "./apikey.js";

export async function communicateWithOpenAi(userInput, selectedPhilosopher) {
  try {
    const apiKey = getApiKey();
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Eres el filósofo ${selectedPhilosopher.name}. Debes responder como él. Cuando te pregunten, sé bastante explícito en tus respuestas, que deben ser entre 50 y 100 palabras. Si puedes, recomienda bibliografía tuya si es posible. Adopta la personalidad del filósofo, aquí hay más información sobre ti: ${selectedPhilosopher.description}`
          },
          {
            role: "user",
            content: userInput
          }
        ]
      })
    });
    
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}


