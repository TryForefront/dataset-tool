import { Sample } from "@/store/useSampleStore";

const prompt = (sampleString: string) =>
  `
Your job is to take the following example from a dataset and generate a similar, but fully distinct example that fits within the dataset, enhancing diversity _and_ quality of the overall dataset.

Here is the example:

${sampleString}

You you will output a JSON array of messages based upon the instructions above. You must output only a JSON object with the key "messages" and the value being an array of messages.
`.trim();

// export default async function generateSimilarSample(
//   sample: Sample,
//   baseUrl: string,
//   model: string,
//   temperature: number,
//   apiKey: string
// ): Promise<Sample> {
//   const body = {
//     messages: [
//       {
//         role: "system",
//         content: prompt(JSON.stringify(sample.messages, null, 2)),
//       },
//     ],
//     temperature,
//     model,
//     response_format: {
//       type: "json_object",
//     },
//     provider: {
//       require_parameters: true,
//       order: ["Fireworks"],
//     },
//   };
//   const response = await fetch(baseUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify(body),
//   });

//   const json = await response.json();

//   const out: Sample = {
//     messages: JSON.parse(json.choices[0].message.content).messages,
//     id: crypto.randomUUID(),
//     likedStatus: 0,
//     labels: ["ai_generated"],
//     versions: [],
//   };

//   return out;
// }

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export default async function generateSimilarSample(
  sample: Sample,
  baseUrl: string,
  model: string,
  temperature: number,
  apiKey: string
) {
  const openai = createOpenAI({
    // custom settings, e.g.
    apiKey,
    compatibility: "strict", // strict mode, enable when using the OpenAI API
  });
  const { text } = await generateText({
    model: openai(model),
    prompt: prompt(JSON.stringify(prompt(JSON.stringify(sample.messages)))),
  });
  console.log(text);

  const json = JSON.parse(text.match(/```json\n([\s\S]*?)\n```/)?.[1] ?? text);
  const out: Sample = {
    messages: json.messages,
    id: crypto.randomUUID(),
    likedStatus: 0,
    labels: ["ai_generated"],
    versions: [],
  };

  console.log(out);

  return out;
}
