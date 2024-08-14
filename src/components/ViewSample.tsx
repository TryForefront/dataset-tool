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
import { Badge } from "@/components/ui/badge";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CardHeader } from "@/components/ui/card";

import { useSampleStore } from "@/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Sample, Message } from "@/store/useSampleStore";
import capitalize from "@/utils/capitalize";
import useHotkey from "@/hooks/useHotkey";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import RewriteDialog from "./dialogs/RewriteDialog";
import GenerateMoreDialog from "./dialogs/GenerateMoreDialog";
import { Checkbox } from "@/components/ui/checkbox";

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
    selectedSampleIds,
    selectSampleId,
    addSample,
  } = useSampleStore();

  const currentSample: any = useMemo(() => {
    if (!samples) return {};
    return samples?.find((sample) => sample?.id === viewSampleId);
  }, [viewSampleId, samples]);

  useEffect(() => {
    if (currentSample) {
      setMessages(currentSample?.messages || []);
    }
  }, [currentSample]);

  function handleIncrementViewSampleId() {
    setEdit(false);
    const currentIndex = samples?.findIndex((s) => s?.id === viewSampleId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < samples.length) {
      setViewSampleId(samples[nextIndex]?.id);
    }
  }

  function handleDecrementViewSampleId() {
    setEdit(false);
    const currentIndex = samples?.findIndex((s) => s?.id === viewSampleId);
    const nextIndex = currentIndex - 1;
    if (nextIndex >= 0) {
      setViewSampleId(samples[nextIndex]?.id);
    }
  }

  function handleDislike() {
    if (currentSample) {
      console.log(currentSample);
      if (currentSample.likedStatus === -1) {
        resetSampleLikeStatus(currentSample?.id);
      } else {
        dislikeSampleById(currentSample?.id);
      }
    }
  }

  function handleLike() {
    if (currentSample) {
      console.log(currentSample);
      if (currentSample.likedStatus === 1) {
        resetSampleLikeStatus(currentSample?.id);
      } else {
        likeSampleById(currentSample?.id);
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
    const originalMessage: Sample | undefined = samples.find(
      (s) => s.id === viewSampleId
    );
    if (!originalMessage) return;

    setMessages([...originalMessage.messages] || []);
    setEdit(false);
  }

  function handleSave() {
    updateSampleMessages(currentSample?.id || "", messages);
    setEdit(false);
  }

  const [generateOpen, setGenerateOpen] = useState(false);
  const [rewriteOpen, setRewriteOpen] = useState(false);
  const [bothModalsClosed, setBothModalsClosed] = useState(true);

  useEffect(() => {
    console.log("Checking if both modals are closed");
    const timer = setTimeout(() => {
      if (!generateOpen && !rewriteOpen) {
        setBothModalsClosed(true);
      } else {
        setBothModalsClosed(false);
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [generateOpen, rewriteOpen]);

  const closeDialog = useCallback(() => {
    setGenerateOpen(false);
    setRewriteOpen(false);
  }, []);

  const handleEscapeKey = useCallback(
    (event: any) => {
      console.log(event.key, bothModalsClosed);
      if (event.key == "Escape") {
        if (bothModalsClosed) {
          resetViewSampleId();
        }
      }
    },
    [bothModalsClosed]
  );

  const handleOpenChange = (open: boolean, setOpenFunction: any) => {
    setOpenFunction(open);
    if (!open) {
      console.log("Dialog was closed");
      // You can perform any additional actions here when the dialog is closed
    }
  };

  useHotkey("Escape", handleEscapeKey);
  useHotkey("e", () => !edit && bothModalsClosed && setEdit(!edit));
  useHotkey(
    "j",
    () => !edit && bothModalsClosed && handleDecrementViewSampleId()
  );
  useHotkey(
    "k",
    () => !edit && bothModalsClosed && handleIncrementViewSampleId()
  );
  useHotkey(
    "ArrowDown",
    () => !edit && bothModalsClosed && handleDecrementViewSampleId()
  );
  useHotkey(
    "ArrowUp",
    () => !edit && bothModalsClosed && handleIncrementViewSampleId()
  );
  useHotkey("l", () => !edit && bothModalsClosed && handleLike());
  useHotkey("h", () => !edit && bothModalsClosed && handleDislike());

  useHotkey("g", () => !edit && bothModalsClosed && setGenerateOpen(true));
  useHotkey("r", () => !edit && bothModalsClosed && setRewriteOpen(true));

  // hotkey x to select
  useHotkey("x", () => {
    if (currentSample) {
      selectSampleId(currentSample.id);
    }
  });

  return (
    <div className="h-full w-full items-start gap-4 md:gap-8 overflow-hidden">
      <CardHeader className=" px-4 sm:px-6 py-2 flex flex-row items-center justify-between border-b">
        <div className="flex flex-col ">
          <div className="flex items-center gap-6">
            <div className="flex gap-2 items-center">
              <div className="w-[120px]">
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
              </div>
              <Checkbox
                checked={selectedSampleIds?.includes(currentSample.id)}
                onCheckedChange={(e) => {
                  console.log("click");

                  selectSampleId(currentSample.id as string);
                }}
              />

              <h2 className="text-base font-medium">
                Sample {samples?.findIndex((s) => s?.id === viewSampleId) + 1}
              </h2>
            </div>
            <div className="flex gap-3">
              <Tooltip>
                <TooltipTrigger>
                  <ThumbsDown
                    className={`h-4 w-4 cursor-pointer ${
                      currentSample?.likedStatus === -1
                        ? "text-red-400"
                        : "text-muted-foreground hover:text-red-400"
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
                        ? "text-green-400"
                        : "text-muted-foreground hover:text-green-400"
                    }`}
                    onClick={handleLike}
                  />{" "}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark sample as liked</p>
                </TooltipContent>
              </Tooltip>
              <div className="flex gap-1 flex-wrap">
                {currentSample?.labels?.map((label: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-7 flex items-center gap-2" style={{ margin: 0 }}>
          <div className="flex items-center gap-2 mr-4 select-none">
            <span className="text-sm pointer-events-none">
              <span className="text-foreground">
                {samples?.findIndex((s) => s?.id === viewSampleId) + 1}
              </span>
              <span className="text-muted-foreground">
                {" "}
                / {samples?.length}
              </span>
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
                className="h-7 gap-1 text-sm text-red-400 border-red-400 hover:bg-muted"
              >
                <X className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Cancel</span>
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm text-green-400 border-green-400 hover:bg-muted"
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
          <Dialog
            open={rewriteOpen}
            onOpenChange={(open) => handleOpenChange(open, setRewriteOpen)}
          >
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <WandSparkles className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Rewrite with AI</span>
              </Button>
            </DialogTrigger>
            <RewriteDialog open={rewriteOpen} />
          </Dialog>

          <Dialog
            open={generateOpen}
            onOpenChange={(open) => handleOpenChange(open, setGenerateOpen)}
          >
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">
                  Generate more like this
                </span>
              </Button>
            </DialogTrigger>
            <GenerateMoreDialog open={generateOpen} />
          </Dialog>
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
