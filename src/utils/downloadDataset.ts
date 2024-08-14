import { Sample } from "@/store/useSampleStore";

export default function downloadDataset(samples: Sample[]): void {
  const jsonLines = samples
    .map((sample) => {
      const jsonObject = {
        messages: sample.messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      };
      return JSON.stringify(jsonObject);
    })
    .join("\n");

  const blob = new Blob([jsonLines], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  const unixTime = Math.floor(Date.now() / 1000);
  a.download = `dataset_${unixTime}.jsonl`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
