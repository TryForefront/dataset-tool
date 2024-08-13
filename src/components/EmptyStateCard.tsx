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
import { useSampleStore } from "@/store";
function EmptyStateCard() {
  const { setSamples } = useSampleStore();

  function onFileUpload(e) {
    console.log(e);
    // when complete do setSamples with the array
  }
  return (
    <div className="h-full w-full flex items-center justify-center mt-[10vh]">
      <Card className="w-[400px] h-full ">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            {`This is a free tool for filtering AI datasets for fine-tuning
            locally on your machine. To get started, upload a dataset using
            JSONL format. For more on properly formatting your dataset, check https://docs.forefront.ai/features/datasets`}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}

export default EmptyStateCard;
