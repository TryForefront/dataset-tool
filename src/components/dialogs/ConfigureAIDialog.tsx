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

import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import providers from "@/constants/providers";
import { useAIStore } from "@/store";
import { useEffect } from "react";

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

  useEffect(() => {
    if (provider) {
      const selectedProvider = providers.find((p) => p.key === provider);
      if (selectedProvider) {
        setBaseUrl(selectedProvider.baseUrl);
        setModelString(selectedProvider.models[0]);
      }
    }
  }, [provider]);

  return (
    <DialogContent className="sm:max-w-[425px]">
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
          Choose an LLM provider and enter your API key to use for AI features.
          Custom base URLs are supported if they are OpenAI API-compatible.
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
            <Input id="modelString" value={modelString} className="flex-grow" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-2">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[300px] overflow-auto">
                {providers
                  .find((p) => p.key === provider)
                  ?.models?.sort((a, b) => a.localeCompare(b))
                  .map((model) => (
                    <DropdownMenuItem
                      key={model}
                      onSelect={() => setModelString(model)}
                    >
                      {model}
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
      <DialogClose className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </DialogClose>
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
          <ChevronDown className="h-4 w-4 opacity-50" />
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
