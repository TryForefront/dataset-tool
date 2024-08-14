"use client";
import { Check, Dot, LoaderCircle } from "lucide-react";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { useAIStore, useSampleStore } from "@/store";
import { useEffect, useState } from "react";
import { Message, Sample } from "@/store/useSampleStore";
import capitalize from "@/utils/capitalize";
import AIConfigPage from "./AIConfigPage";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import useHotkey from "@/hooks/useHotkey";

const RewriteDialog = ({ open }) => {
  const { provider, baseUrl, apiKeys, modelString } = useAIStore();

  const { samples, viewSampleId, addSample, updateSampleMessages } =
    useSampleStore();

  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedSample, setAddedSample] = useState<boolean>(false);
  const [result, setResult] = useState<Sample | undefined>(undefined);

  const [rewriteInput, setRewriteInput] = useState<string>("");

  useEffect(() => {
    return () => {
      setAddedSample(false);
      setResult(undefined);
      setIsGenerating(false);
    };
  }, []);

  async function handleRewrite() {
    try {
      setResult(undefined);
      setAddedSample(false);
      setIsGenerating(true);
      const currentSample = samples?.find((s) => s.id === viewSampleId);
      console.log(currentSample);
      if (!currentSample) return;
      // const newSample = await generateSimilarSample(
      //   provider,
      //   currentSample as Sample,
      //   baseUrl,
      //   modelString,
      //   0.7,
      //   apiKeys[provider]
      // );
      if (newSample) {
        setResult(newSample);
      }
      setIsGenerating(false);
      setResult(newSample);
    } catch (e) {
      setIsGenerating(false);
      setError(
        "Something went wrong. Please try again later or use a different model."
      );
    }
  }

  useHotkey("Enter", () => {
    if (!open) return;
    if (page == 0 && provider && baseUrl && apiKeys[provider] && modelString) {
      setPage(1);
    }
  });

  useHotkey("Enter", (event) => {
    if (!open || !event.metaKey) return;
    if (page == 1 && rewriteInput) {
      handleRewrite();
    }
  });

  return (
    <DialogContent className={`  sm:max-w-[${page === 0 ? "325px" : "600px"}]`}>
      {page == 0 && <AIConfigPage />}
      {page == 1 && (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              AI Rewrite
            </DialogTitle>
          </DialogHeader>

          <div className="w-full h-full overflow-auto max-h-[400px] pb-24">
            {!isGenerating && !result && (
              <div className="flex flex-col gap-4">
                <Label className="text-left">
                  Provide instructions for the LLM to rewrite the sample
                </Label>
                <textarea
                  id="rewriteInput"
                  value={rewriteInput}
                  onChange={(e) => {
                    e.preventDefault();
                    setRewriteInput(e.target.value);
                  }}
                  className="w-full h-32 p-2 border rounded-lg resize-none"
                />
              </div>
            )}
            {isGenerating && (
              <div className="flex gap-2 justify-start items-start">
                <p className=" text-muted-foreground">
                  Please wait while your sample is generating...
                </p>
                <div className="animate-spin h-full items-center flex">
                  <LoaderCircle className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            )}
            {error && (
              <div className="flex gap-2 justify-start items-start">
                <p className=" text-red-500">{error}</p>
              </div>
            )}
            {result && result?.messages && (
              <Table className="w-full">
                <TableBody>
                  {!isGenerating &&
                    result &&
                    result?.messages?.map((message: Message, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-muted-foreground font-light p-2 py-4 w-[120px] align-top whitespace-nowrap">
                          {capitalize(message.role)}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex gap-1 flex-wrap align-top whitespace-pre-line">
                            {message.content}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </div>
        </>
      )}
      {page == 0 && (
        <DialogFooter className="flex justify-end">
          <Button
            disabled={
              !provider || !baseUrl || !apiKeys[provider] || !modelString
            }
            onClick={() => setPage(1)}
            type="button"
          >
            Next
          </Button>
        </DialogFooter>
      )}
      {page == 1 && (
        <DialogFooter className="flex w-full sm:justify-between">
          <Button onClick={() => setPage(0)} type="button" variant={"outline"}>
            Choose AI provider
          </Button>
          <div className="flex gap-2">
            {result && (
              <Button
                disabled={
                  !provider || !baseUrl || !apiKeys[provider] || !modelString
                }
                onClick={() => {
                  if (result && viewSampleId) {
                    updateSampleMessages(viewSampleId, result.messages);
                  }
                  setAddedSample(true);
                }}
                type="button"
                variant={"outline"}
              >
                {addedSample ? (
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 inline-block ml-1" />
                    Added
                  </div>
                ) : (
                  "Add to dataset"
                )}
              </Button>
            )}
            <Button
              disabled={
                !provider ||
                !baseUrl ||
                !apiKeys[provider] ||
                !modelString ||
                isGenerating ||
                !rewriteInput
              }
              onClick={() => {
                setIsGenerating(true);
                setAddedSample(false);
                handleRewrite();
              }}
              type="button"
              className="flex  items-center gap-2"
            >
              <span>{result ? "Try again" : "Generate"}</span>
              {/* <kbd className="px-1 py-[0.5] text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                ⌘ Enter
              </kbd> */}
            </Button>
          </div>
        </DialogFooter>
      )}

      <div className="flex w-full justify-center gap-0">
        <Dot
          className={`hover:text-foreground ${
            page === 0 ? "text-foreground" : " text-muted-foreground/[0.7]"
          }`}
        />
        <Dot
          className={` hover:text-foreground ${
            page === 1 ? "text-foreground" : " text-muted-foreground/[0.7]"
          }`}
        />
      </div>
    </DialogContent>
  );
};

export default RewriteDialog;
