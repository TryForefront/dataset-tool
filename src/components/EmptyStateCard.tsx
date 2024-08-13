"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSampleStore } from "@/store";

function EmptyStateCard() {
  const { setSamples } = useSampleStore();

  function onFileUpload() {
    // when complete do setSamples with the array
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          This is a free tool for filtering AI datasets for fine-tuning locally
          on your machine. To get started, upload a .jsonl dataset.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <input
            type="file"
            accept=".jsonl"
            style={{ display: "none" }}
            id="fileInput"
            onChange={onFileUpload} // Empty onUpload handler for now
          />
          <label htmlFor="fileInput">
            <Button as="span">Upload Dataset</Button>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}

export default EmptyStateCard;
