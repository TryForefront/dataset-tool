import { Sample } from "../store/useSampleStore";

const samples: Sample[] = [
  {
    id: "sample1",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello, how are you?" },
      {
        role: "assistant",
        content: "I'm doing well, thank you. How can I help you today?",
      },
    ],
    likedStatus: 0,
    labels: ["greeting", "general"],
  },
  {
    id: "sample2",
    messages: [
      { role: "user", content: "What's the capital of France?" },
      { role: "assistant", content: "The capital of France is Paris." },
    ],
    likedStatus: 0,
    labels: ["geography", "question"],
  },
  {
    id: "sample3",
    messages: [
      { role: "user", content: "Can you write a haiku about spring?" },
      {
        role: "assistant",
        content:
          "Cherry blossoms bloom\nGentle breeze whispers softly\nNature awakens",
      },
    ],
    likedStatus: 0,
    labels: ["creative", "poetry"],
  },
  {
    id: "sample4",
    messages: [
      { role: "system", content: "You are a math tutor." },
      { role: "user", content: "What's 7 times 8?" },
      { role: "assistant", content: "7 times 8 equals 56." },
    ],
    likedStatus: 0,
    labels: ["math", "multiplication"],
  },
  {
    id: "sample5",
    messages: [
      { role: "user", content: "Tell me a joke." },
      {
        role: "assistant",
        content:
          "Why don't scientists trust atoms? Because they make up everything!",
      },
    ],
    likedStatus: 0,
    labels: ["humor", "science"],
  },
  {
    id: "sample6",
    messages: [
      { role: "user", content: "What's the boiling point of water?" },
      {
        role: "assistant",
        content: "The boiling point of water is 100°C or 212°F at sea level.",
      },
    ],
    likedStatus: 0,
    labels: ["science", "physics"],
  },
  {
    id: "sample7",
    messages: [
      { role: "system", content: "You are a cooking assistant." },
      { role: "user", content: "How do I make scrambled eggs?" },
      {
        role: "assistant",
        content:
          "Whisk eggs, cook in a pan over medium heat, stirring constantly until set.",
      },
    ],
    likedStatus: 0,
    labels: ["cooking", "recipe"],
  },
  {
    id: "sample8",
    messages: [
      {
        role: "user",
        content: "What's the largest planet in our solar system?",
      },
      {
        role: "assistant",
        content: "The largest planet in our solar system is Jupiter.",
      },
    ],
    likedStatus: 0,
    labels: ["astronomy", "planets"],
  },
  {
    id: "sample9",
    messages: [
      { role: "user", content: "Can you translate 'hello' to Spanish?" },
      { role: "assistant", content: "'Hello' in Spanish is 'Hola'." },
    ],
    likedStatus: 0,
    labels: ["translation", "language"],
  },
  {
    id: "sample10",
    messages: [
      { role: "system", content: "You are a fitness coach." },
      { role: "user", content: "What's a good exercise for beginners?" },
      {
        role: "assistant",
        content: "Walking is a great low-impact exercise for beginners.",
      },
    ],
    likedStatus: 0,
    labels: ["fitness", "health"],
  },
];

export default samples;
