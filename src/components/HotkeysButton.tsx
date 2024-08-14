"use client";
import { useSampleStore } from "@/store";
import { CircleHelp } from "lucide-react";
import { Button } from "./ui/button";
import useHotkey from "@/hooks/useHotkey";

const HotkeysButton = () => {
  const { toggleHotkeys } = useSampleStore();

  useHotkey("?", toggleHotkeys);
  return (
    <Button
      size="sm"
      variant="outline"
      className="h-7 gap-1 text-sm"
      onClick={toggleHotkeys}
    >
      <CircleHelp className="h-3.5 w-3.5" />
      Hotkeys
    </Button>
  );
};

export default HotkeysButton;
