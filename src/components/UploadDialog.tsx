"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import parseDataset from "@/utils/parseDataset";
import useSamples from "@/store/useSampleStore";

export default function UploadDialog() {
  const { setSamples } = useSamples();
  function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      parseDataset(file).then((samples) => setSamples(samples));
    }
  }
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload dataset to get started.</DialogTitle>
          <DialogDescription>
            Warning! This will replace your current dataset.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-end h-full">
          <input
            type="file"
            accept=".jsonl"
            style={{ display: "none" }}
            id="fileInput"
            onChange={onFileUpload}
          />
          <Button
            onClick={() => document?.getElementById("fileInput")?.click()}
          >
            Upload Dataset
          </Button>
        </div>
        <DialogFooter className="flex justify-center items-center"></DialogFooter>
      </DialogContent>
    </>
  );
}
