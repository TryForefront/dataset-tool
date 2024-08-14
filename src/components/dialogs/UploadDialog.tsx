"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import parseDataset from "@/utils/parseDataset";
import useSamples from "@/store/useSampleStore";

export default function UploadDialog() {
  const { setSamples, setViewSampleId } = useSamples();

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
          <DialogTitle>Are you sure you want to do this</DialogTitle>
          <DialogDescription>
            Warning! This action cannot be undone. Please download your dataset
            if you want to keep it.
          </DialogDescription>
        </DialogHeader>
        <div className="flex  items-end h-full">
          <input
            type="file"
            accept=".jsonl"
            style={{ display: "none" }}
            id="fileInput"
            onChange={onFileUpload}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                setSamples([]);
                setViewSampleId(undefined);
                // document?.getElementById("fileInput")?.click();
                // document.getElementById("closeDialog")?.click();
              }}
            >
              Clear dataset
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
