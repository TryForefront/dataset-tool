"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import parseDataset from "@/utils/parseDataset";
import { useSampleStore } from "@/store";
function EmptyStateCard() {
  const { setSamples } = useSampleStore();

  function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      parseDataset(file).then((samples) => setSamples(samples));
    }
  }
  return (
    <div className=" w-full flex items-center justify-center mt-[10vh]">
      <Card className="w-[400px] h-full bg-gradient-to-br from-background to-muted shadow-lg">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Welcome to the AI Dataset Filtering Tool
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm space-y-4">
            <p className="text-center">
              Streamline your LLM training with our open-source dataset
              filtering tool.
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                Quick filtering, rating, and editing with shortcuts
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                AI-powered data generation and editing
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                Download refined datasets with ease
              </li>
            </ul>
            <p className="text-center font-semibold">
              All LLM calls are processed client-side for your privacy.
            </p>
            <p className="text-center italic">
              Begin by uploading your JSONL format dataset.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full gap-2 justify-center items-end h-full">
            <input
              type="file"
              accept=".jsonl"
              style={{ display: "none" }}
              id="fileInput"
              onChange={onFileUpload}
            />
            <Button
              className="w-full"
              onClick={() => document?.getElementById("fileInput")?.click()}
            >
              Upload Dataset
            </Button>
            <Button
              variant="outline"
              className=" w-full"
              onClick={() =>
                window.open(
                  "https://docs.forefront.ai/features/datasets",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Dataset Docs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmptyStateCard;
