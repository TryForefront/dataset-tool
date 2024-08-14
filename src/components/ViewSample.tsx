"use client";
import {
  Edit,
  Sparkles,
  WandSparkles,
  ThumbsDown,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CardHeader } from "@/components/ui/card";

import { useAIStore, useSampleStore } from "@/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Sample, Message } from "@/store/useSampleStore";
import capitalize from "@/utils/capitalize";
import useHotkey from "@/hooks/useHotkey";
import generateSimilarSample from "@/utils/generateSimilarSample";

const ViewSample = () => {
  const [edit, setEdit] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    viewSampleId,
    setViewSampleId,
    samples,
    likeSampleById,
    dislikeSampleById,
    resetViewSampleId,
    updateSampleMessages,
    resetSampleLikeStatus,
    addSample,
  } = useSampleStore();

  const { aiConfig } = useAIStore();

  const currentSample = useMemo(() => {
    if (!samples) return {};
    return samples?.find((sample) => sample.id === viewSampleId);
  }, [viewSampleId, samples]);

  useEffect(() => {
    console.log("current sampl updated");
    if (currentSample) {
      setMessages(currentSample.messages);
    }
  }, [currentSample]);

  function handleIncrementViewSampleId() {
    setEdit(false);
    const currentIndex = samples.findIndex((s) => s.id === viewSampleId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < samples.length) {
      setViewSampleId(samples[nextIndex].id);
    }
  }

  function handleDecrementViewSampleId() {
    setEdit(false);
    const currentIndex = samples.findIndex((s) => s.id === viewSampleId);
    const nextIndex = currentIndex - 1;
    if (nextIndex >= 0) {
      setViewSampleId(samples[nextIndex].id);
    }
  }

  function handleDislike() {
    if (currentSample) {
      console.log(currentSample);
      if (currentSample.likedStatus === -1) {
        resetSampleLikeStatus(currentSample.id);
      } else {
        dislikeSampleById(currentSample.id);
      }
    }
  }

  function handleLike() {
    if (currentSample) {
      console.log(currentSample);
      if (currentSample.likedStatus === 1) {
        resetSampleLikeStatus(currentSample.id);
      } else {
        likeSampleById(currentSample.id);
      }
    }
  }

  const handleMessageChange = useCallback(
    (index: number, newContent: string) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg, i) =>
          i === index ? { ...msg, content: newContent } : msg
        )
      );
    },
    []
  );

  function handleCancel() {
    const originalMessage = samples.find(
      (s) => s.id === viewSampleId
    )?.messages;
    setMessages([...originalMessage] || []);
    setEdit(false);
  }

  function handleSave() {
    updateSampleMessages(currentSample?.id || "", messages);
    setEdit(false);
  }

  useHotkey("Escape", resetViewSampleId);
  useHotkey("e", () => !edit && setEdit(!edit));
  useHotkey("j", () => !edit && handleDecrementViewSampleId());
  useHotkey("k", () => !edit && handleIncrementViewSampleId());
  useHotkey("ArrowDown", () => !edit && handleDecrementViewSampleId());
  useHotkey("ArrowUp", () => !edit && handleIncrementViewSampleId());
  useHotkey("l", () => !edit && handleLike());
  useHotkey("h", () => !edit && handleDislike());

  return (
    <div className="h-full w-full items-start gap-4 md:gap-8 overflow-hidden">
      <CardHeader className=" px-4 sm:px-6 py-2 flex flex-row items-center justify-between border-b">
        <div className="flex flex-col ">
          <div className="flex items-center gap-6">
            <div className="flex gap-2 items-center">
              <Tooltip>
                <TooltipTrigger>
                  <ArrowLeft
                    onClick={resetViewSampleId}
                    className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back to samples</p>
                </TooltipContent>
              </Tooltip>

              <h2 className="text-base font-medium">Sample #1</h2>
            </div>
            <div className="flex gap-3">
              <Tooltip>
                <TooltipTrigger>
                  <ThumbsDown
                    className={`h-4 w-4 cursor-pointer ${
                      currentSample?.likedStatus === -1
                        ? "text-red-500"
                        : "text-muted-foreground hover:text-red-500"
                    }`}
                    onClick={handleDislike}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark sample as disliked</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ThumbsUp
                    className={`h-4 w-4 cursor-pointer ${
                      currentSample?.likedStatus === 1
                        ? "text-green-500"
                        : "text-muted-foreground hover:text-green-500"
                    }`}
                    onClick={handleLike}
                  />{" "}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark sample as liked</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="h-7 flex items-center gap-2" style={{ margin: 0 }}>
          <div className="flex items-center gap-2 mr-4 select-none">
            <span className="text-sm pointer-events-none">
              <span className="text-foreground">
                {samples?.findIndex((s) => s.id === viewSampleId) + 1}
              </span>
              <span className="text-muted-foreground"> / {samples.length}</span>
            </span>

            <Tooltip>
              <TooltipTrigger>
                <ChevronUp
                  onClick={handleIncrementViewSampleId}
                  className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
                />{" "}
              </TooltipTrigger>
              <TooltipContent>
                <p>View next sample</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <ChevronDown
                  onClick={handleDecrementViewSampleId}
                  className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>View previous sample</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {edit ? (
            <>
              <Button
                onClick={handleCancel}
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm text-red-500 border-red-500 hover:bg-muted"
              >
                <X className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Cancel</span>
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm text-green-500 border-green-500 hover:bg-muted"
              >
                <Check className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Save</span>
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEdit(true)}
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-sm"
            >
              <Edit className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Edit</span>
            </Button>
          )}
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <WandSparkles className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Rewrite with AI</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-sm"
            onClick={async () => {
              const newSample = await generateSimilarSample(
                currentSample! as Sample,
                aiConfig.baseUrl,
                aiConfig.modelString,
                0.7,
                aiConfig.apiKey
              );

              addSample(newSample);
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">
              Generate more like this
            </span>
          </Button>
        </div>
      </CardHeader>

      <div className="h-full  flex-grow ">
        <div className="w-full h-full overflow-auto px-4 pb-24">
          <Table className="w-full">
            <TableBody>
              {messages?.map((message: Message, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-muted-foreground font-light p-2 py-4 w-[120px] align-top whitespace-nowrap">
                    {capitalize(message.role)}
                  </TableCell>
                  <TableCell className="py-4">
                    {edit ? (
                      <textarea
                        className="w-full h-auto p-2 border rounded"
                        value={message.content}
                        style={{ height: "auto", minHeight: "100px" }}
                        onFocus={(e) =>
                          (e.target.style.height = `${e.target.scrollHeight}px`)
                        }
                        onChange={(e) => {
                          e.preventDefault();
                          handleMessageChange(index, e.target.value);
                        }}
                      />
                    ) : (
                      <div className="flex gap-1 flex-wrap align-top whitespace-pre-line">
                        {message.content}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewSample;
