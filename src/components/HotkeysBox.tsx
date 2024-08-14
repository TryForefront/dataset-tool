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

const Kbd = ({ children }: any) => <kbd className="?">{children}</kbd>;

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
              <CommandShortcut>
                <Kbd>j</Kbd> / <Kbd>↑</Kbd>
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Move down / up</span>
              <CommandShortcut>
                <Kbd>k</Kbd> / <Kbd>↓</Kbd>
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Toggle selection</span>
              <CommandShortcut>
                <Kbd>x</Kbd>
              </CommandShortcut>
            </CommandItem>

            <CommandItem>
              <span>View sample</span>
              <CommandShortcut>
                <Kbd>Enter</Kbd>
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Toggle hotkey pop-up</span>
              <CommandShortcut>
                <Kbd>?</Kbd>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        ) : (
          <>
            <CommandGroup heading="Navigation">
              <CommandItem>
                <span>Back to dataset list</span>
                <CommandShortcut>
                  <Kbd>Esc</Kbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Previous sample</span>
                <CommandShortcut>
                  <Kbd>j</Kbd> / <Kbd>↑</Kbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Next sample</span>
                <CommandShortcut>
                  <Kbd>k</Kbd> / <Kbd>↓</Kbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Toggle hotkey pop-up</span>
                <CommandShortcut>
                  <Kbd>?</Kbd>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem>
                <CommandItem>
                  <span>Toggle selection</span>
                  <CommandShortcut>
                    <Kbd>x</Kbd>
                  </CommandShortcut>
                </CommandItem>

                <span>Like sample</span>
                <CommandShortcut>
                  <Kbd>l</Kbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Dislike sample</span>
                <CommandShortcut>
                  <Kbd>h</Kbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Toggle edit mode</span>
                <CommandShortcut>
                  <Kbd>e</Kbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Generate more samples with AI</span>
                <CommandShortcut>
                  <Kbd>g</Kbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Rewrite with AI</span>
                <CommandShortcut>
                  <Kbd>r</Kbd>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default HotkeysBox;
