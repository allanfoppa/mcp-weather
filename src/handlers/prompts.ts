type PromptResult = {
  messages: { role: 'user' | 'assistant'; content: { type: 'text'; text: string } }[];
};

export function handleWeatherSummaryPrompt({ city, state }: { city: string; state: string }): PromptResult {
  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Give me a complete weather summary for ${city}, ${state}. Include the current forecast and any active weather alerts. Present it in a clear, easy-to-read format.`,
        },
      },
    ],
  };
}

export function handleWeatherCheckPrompt({ state }: { state: string }): PromptResult {
  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Check for any severe weather alerts in ${state.toUpperCase()}. If there are active alerts, summarize the most critical ones and explain what precautions people should take.`,
        },
      },
    ],
  };
}
