import { Sample } from "@/store/useSampleStore";

const prompt = (sampleString: string) =>
  `
Your job is to take the following example from a dataset some instructions from the user, and edit the example to fit the edit instructions. You will output the full edited example, identical to the original except in the way the example is edited as described by the instructions.

Here is the example:

${sampleString}

You will generate an example using the function provided. The function is called 'modifySample' and it takes one argument, which is a stringified JSON object with the key 'messages'. It should parse this JSON string and use the 'messages' array as a reference to generate a new array of messages. Each message in the new array should be an object with 'role' and 'content' properties. Ensure that the generated messages are identical to the original sample except for the edits described by the instructions. It should be a diverse and high quality sample that will improve the overall quality of the dataset.
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

import { generateObject } from "ai";
import { z } from "zod";

const schema = z.object({
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    })
  ),
});

import providers from "@/constants/providers";

export default async function generateSimilarSample(
  provider: string,
  sample: Sample,
  baseUrl: string,
  model: string,
  temperature: number,
  apiKey: string
) {
  try {
    const constructor: any = providers.find(
      (p) => p.key == provider
    )?.constructor;

    if (!constructor) {
      throw new Error(`Provider ${provider} not found`);
    }
    const client = constructor({
      baseUrl,
      apiKey,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const { object } = await generateObject({
      model: client(model),
      schema,
      prompt: prompt(JSON.stringify(prompt(JSON.stringify(sample.messages)))),
    });

    const out: Sample = {
      messages: object.messages,
      id: crypto.randomUUID(),
      likedStatus: 0,
      labels: ["ai_generated"],
      versions: [],
    };

    return out;
  } catch (e) {
    console.error(JSON.stringify(e));
  }
}
