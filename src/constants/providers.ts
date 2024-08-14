const providers = [
  {
    key: "openai",
    name: "OpenAI",
    baseUrl: "https://api.openai.com/v1/chat/completions",
    models: [
      "gpt-4o-2024-08-06",
      "gpt-4",
      "gpt-4-turbo-preview",
      "gpt-3.5-turbo",
      "gpt-4o-mini",
      "gpt-4-turbo",
    ],
  },
  {
    key: "anthropic",
    name: "Anthropic",
    baseUrl: "https://api.anthropic.com/v1/messages",
    models: [
      "claude-3-5-sonnet-20240620",
      "claude-3-opus-20240229",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307",
    ],
  },
  {
    key: "mistral",
    name: "Mistral AI",
    baseUrl: "https://api.mistral.ai/v1/chat/completions",
    models: [
      "mistral-large-latest",
      "open-mistral-nemo",
      "codestral-latest",
      "mistral-embed",
      "open-mistral-7b",
      "open-mixtral-8x7b",
      "open-mixtral-8x22b",
      "open-codestral-mamba",
    ],
  },
  {
    key: "groq",
    name: "Groq",
    baseUrl: "https://api.groq.com/openai/v1/chat/completions",
    models: [
      "llama-3.1-405b-reasoning",
      "llama-3.1-70b-versatile",
      "llama-3.1-8b-instant",
      "llama3-groq-70b-8192-tool-use-preview",
      "llama3-groq-8b-8192-tool-use-preview",
      "llama-guard-3-8b",
      "llama3-70b-8192",
      "llama3-8b-8192",
      "mixtral-8x7b-32768",
      "gemma-7b-it",
      "gemma2-9b-it",
    ],
  },
];

export default providers;
