import { Sample } from "@/store/useSampleStore";

const prompt = (sampleString: string) =>
  `
You are tasked with generating a similar but distinct example based on the provided dataset sample. Your goal is to enhance both the diversity and quality of the overall dataset.

To accomplish this, you will use the 'generateSimilarMessages' function. This function expects the following parameters:

1. messages: An array of message objects, each containing 'role' and 'content' properties.

The function should:
1. Analyze the input messages array.
2. Generate a new array of message objects that are similar in structure and context to the input, but with unique and diverse content.
3. Ensure each new message object has 'role' and 'content' properties.
4. Return the new array of message objects.

Your generated messages should maintain the essence of the original sample while introducing new, high-quality content that expands the dataset's diversity.

Here is the sample to base your generation on:

${sampleString}

Use the 'generateSimilarMessages' function to generate a new, unique array of messages based on the provided sample
`.trim();

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
  const constructor: any = providers.find(
    (p) => p.key == provider
  )?.constructor;

  if (!constructor) {
    throw new Error(`Provider ${provider} not found`);
  }

  try {
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
      prompt: prompt(JSON.stringify(sample.messages)),
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
  const client = constructor({
    baseUrl,
    apiKey,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  console.log(sample.messages);

  const { object } = await generateObject({
    model: client(model),
    schema,
    prompt: prompt(JSON.stringify(sample.messages)),
    temperature,
  }).catch((e) => {
    console.error(JSON.stringify(e));
    throw new Error(`Failed to generate object`);
  });

  const out: Sample = {
    messages: object.messages,
    id: crypto.randomUUID(),
    likedStatus: 0,
    labels: ["ai_generated"],
    versions: [],
  };

  return out;
}
