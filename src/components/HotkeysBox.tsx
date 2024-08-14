"use client";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { useSampleStore } from "@/store";
import { CreditCard } from "lucide-react";
const HotkeysBox = () => {
  const { hoverIndex, viewSampleId, showHotkeys, toggleHotkeys } =
    useSampleStore();

  return (
    <CommandDialog open={showHotkeys} onOpenChange={toggleHotkeys}>
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <CommandList className="mt-4">
        <CommandEmpty>No results found.</CommandEmpty>

        {viewSampleId === undefined ? (
          <CommandGroup heading="Navigation">
            <CommandItem>
              <span>Move up</span>
              <CommandShortcut>j / ↑</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Move down / up</span>
              <CommandShortcut>k / ↓</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>View sample</span>
              <CommandShortcut>Enter</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Toggle hotkey pop-up</span>
              <CommandShortcut>?</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        ) : (
          <>
            <CommandGroup heading="Navigation">
              <CommandItem>
                <span>Back to dataset list</span>
                <CommandShortcut>Esc</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Previous sample</span>
                <CommandShortcut>j / ↑</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Next sample</span>
                <CommandShortcut>k / ↓</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Toggle hotkey pop-up</span>
                <CommandShortcut>?</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem>
                <span>Like sample</span>
                <CommandShortcut>l</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Dislike sample</span>
                <CommandShortcut>h</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Toggle edit mode</span>
                <CommandShortcut>e</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Generate more samples with AI</span>
                <CommandShortcut>g</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Rewrite with AI</span>
                <CommandShortcut>r</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default HotkeysBox;
