import { Sample } from "@/store/useSampleStore";

export default async function parseDataset(file: File) {
  const sample: Sample = {
    id: crypto.randomUUID(),
    messages: [],
    likedStatus: 0,
    labels: [],
  };
  const fileReader = new FileReader();

  const objects: any[] = await new Promise((resolve) => {
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      const data = e.target?.result;
      const lines: string[] = data?.toString()?.split("\n") || [];

      resolve(
        lines
          .map((line) => {
            try {
              return JSON.parse(line);
            } catch (error) {
              return null;
            }
          })
          .filter(Boolean)
      );
    };
  });

  for (const object of objects) {
    if (object.messages) {
      for (const message of object.messages) {
        if (!!message.role && !!message.content) {
          sample.messages.push({
            content: message.content,
            role: message.role,
          });
        } else {
          console.error("Invalid message", message);
        }
      }
    } else if (object.conversations) {
      for (const message of object.conversations) {
        if (!!message.from && !!message.value) {
          sample.messages.push({
            content: message.value,
            role: message.from == "human" ? "user" : "assistant",
          });
        } else {
          console.error("Invalid message", message);
        }
      }
    }
  }

  return sample;
}
