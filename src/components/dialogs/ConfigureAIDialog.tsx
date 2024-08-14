"use client";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Check, ChevronDown, Dot, LoaderCircle, Star } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import providers from "@/constants/providers";
import { useAIStore, useSampleStore } from "@/store";
import { useEffect, useState } from "react";
import { Message, Sample } from "@/store/useSampleStore";
import generateSimilarSample from "@/utils/generateSimilarSample";
import capitalize from "@/utils/capitalize";
import page from "@/app/page";

const ConfigureAIDialog = () => {
  const {
    provider,
    baseUrl,
    apiKeys,
    modelString,
    setBaseUrl,
    setApiKey,
    setModelString,
  } = useAIStore();

  const { samples, viewSampleId, addSample } = useSampleStore();

  useEffect(() => {
    if (provider) {
      const selectedProvider = providers.find((p) => p.key === provider);
      if (selectedProvider) {
        setBaseUrl(selectedProvider.baseUrl);
        setModelString(selectedProvider.models[0]);
      }
    }
  }, [provider]);

  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedSample, setAddedSample] = useState<boolean>(false);
  const [result, setResult] = useState<Sample | undefined>(undefined);

  useEffect(() => {
    // if provider, baseUrl, apiKey, modelString are set go to page 1

    return () => {
      setAddedSample(false);
      setResult(undefined);
      setIsGenerating(false);
    };
  }, []);

  async function generateSimilar() {
    try {
      setResult(undefined);
      setAddedSample(false);
      setIsGenerating(true);
      const currentSample = samples?.find((s) => s.id === viewSampleId);
      console.log(currentSample);
      if (!currentSample) return;
      const newSample = await generateSimilarSample(
        provider,
        currentSample as Sample,
        baseUrl,
        modelString,
        0.7,
        apiKeys[provider]
      );
      if (newSample) {
        setResult(newSample);
      }
      setIsGenerating(false);
      setResult(newSample);
    } catch (e) {
      setError(
        "Something went wrong. Please try again later or use a different model."
      );
    }
  }

  useEffect(() => {
    if (page == 1) {
      generateSimilar()
        .then(() => setIsGenerating(false))
        .catch(() => setIsGenerating(false));
    }
  }, [page]);

  return (
    <DialogContent className={`  sm:max-w-[${page === 0 ? "325px" : "600px"}]`}>
      {page == 0 && (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Configure AI settings
              {/* <Tooltip>
            <TooltipTrigger> */}
              <Badge variant="secondary">Client-side API calls</Badge>
              {/* </TooltipTrigger>
            <TooltipContent>
              <p>Calls to AI models run locally on your device</p>
            </TooltipContent>
          </Tooltip> */}
            </DialogTitle>
            <DialogDescription>
              Choose an LLM provider and enter your API key to use for AI
              features. Custom base URLs are supported if they are OpenAI
              API-compatible.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provider" className=" text-right">
                Provider
              </Label>
              <ProviderDropdown />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modelString" className="text-right">
                Model
              </Label>
              <div className="flex col-span-3 gap-2">
                <Input
                  id="modelString"
                  value={modelString}
                  className="flex-grow"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="px-2">
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-[300px]  overflow-auto">
                    {providers
                      .find((p) => p.key === provider)
                      ?.models?.sort((a, b) => {
                        const recommended =
                          providers.find((p) => p.key === provider)
                            ?.recommended || [];
                        if (recommended.includes(a) && !recommended.includes(b))
                          return -1;
                        if (!recommended.includes(a) && recommended.includes(b))
                          return 1;
                        return a.localeCompare(b);
                      })
                      .map((model) => (
                        <DropdownMenuItem
                          key={model}
                          onSelect={() => setModelString(model)}
                          className="flex gap-2 items-center justify-between"
                        >
                          {model}
                          {providers
                            .find((p) => p.key === provider)
                            ?.recommended?.includes(model) && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Star className="h-4 w-4 text-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Recommended</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="baseUrl" className="text-right">
                Base URL
              </Label>
              <Input id="baseUrl" value={baseUrl} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                API Key
              </Label>
              <Input
                id="apiKey"
                className="col-span-3"
                value={apiKeys[provider] || ""}
                onChange={(e) => setApiKey(provider, e.target.value)}
              />
            </div>
          </div>
        </>
      )}
      {page == 1 && (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Generating
            </DialogTitle>
          </DialogHeader>

          <div className="w-full h-full overflow-auto max-h-[400px] pb-24">
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
            Generate
          </Button>
        </DialogFooter>
      )}
      {page == 1 && (
        <DialogFooter className="flex w-full sm:justify-between">
          <Button onClick={() => setPage(0)} type="button" variant={"outline"}>
            Choose AI provider
          </Button>
          <div className="flex gap-2">
            <Button
              disabled={
                !provider || !baseUrl || !apiKeys[provider] || !modelString
              }
              onClick={() => {
                if (result) {
                  addSample(result);
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

            <Button
              disabled={
                !provider || !baseUrl || !apiKeys[provider] || !modelString
              }
              onClick={() => {
                setResult(undefined);
                setIsGenerating(true);
                setAddedSample(false);
                generateSimilar();
              }}
              type="button"
            >
              Try again
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

export default ConfigureAIDialog;

const ProviderDropdown = () => {
  const { provider, setProvider } = useAIStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className=" justify-between col-span-3">
          <span>{providers.find((p) => p.key === provider)?.name}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full right-0 ">
        <DropdownMenuGroup>
          {providers.map((provider) => (
            <DropdownMenuItem
              key={provider.key}
              onSelect={() => setProvider(provider.key)}
            >
              <span>{provider.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
