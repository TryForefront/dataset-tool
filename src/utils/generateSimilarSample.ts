import { Sample } from "@/store/useSampleStore";

const prompt = (sampleString: string) =>
  `
Your job is to take the following example from a dataset and generate a similar, but fully distinct example that fits within the dataset, enhancing diversity _and_ quality of the overall dataset.

Here is the example:

${sampleString}

You you will output a JSON array of messages based upon the instructions above. You must output a JSON object with the key "messages" and the value being an array of messages.
`.trim();

export default async function generateSimilarSample(
  sample: Sample,
  baseUrl: string,
  model: string,
  temperature: number,
  apiKey: string
): Promise<Sample> {
  const body = {
    messages: [
      {
        role: "system",
        content: prompt(JSON.stringify(sample.messages, null, 2)),
      },
    ],
    temperature,
    model,
    response_format: {
      type: "json_object",
    },
    provider: {
      require_parameters: true,
      order: ["Fireworks"],
    },
  };
  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  const out: Sample = {
    messages: JSON.parse(json.choices[0].message.content).messages,
    id: crypto.randomUUID(),
    likedStatus: 0,
    labels: [],
    versions: [],
  };

  return out;
}
