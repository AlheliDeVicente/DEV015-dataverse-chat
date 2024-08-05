import { getApiKey } from "./apikey.js";
export async function communicateWithOpenAi(messages) {
  try{
    const apiKey = getApiKey();
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        "model": "gpt-4o",
        "messages": messages
      })
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error:", error.message);
    throw error; 
  }
}

