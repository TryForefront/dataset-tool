import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { CopyPlus, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import { useSampleStore } from "@/store";
import { Sample } from "@/store/useSampleStore";
import useHotkey from "@/hooks/useHotkey";
import { useRef } from "react";

const DatasetTable = ({ samples }: { samples: Sample[] }) => {
  const { hoverIndex, setHoverIndex } = useSampleStore();

  useHotkey("Enter", () => {
    if (hoverIndex > -1) {
      setViewSampleId(samples[hoverIndex].id);
    }
  });
  const rowRefs: any = useRef([]);

  const scrollToIndex = (index: number) => {
    if (rowRefs.current[index]) {
      rowRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useHotkey("j", () => {
    if (hoverIndex < samples.length - 1) {
      const newIndex = hoverIndex + 1;
      setHoverIndex(newIndex);
      scrollToIndex(newIndex);
    }
  });

  useHotkey("ArrowDown", () => {
    if (hoverIndex < samples.length - 1) {
      const newIndex = hoverIndex + 1;
      setHoverIndex(newIndex);
      scrollToIndex(newIndex);
    }
  });

  useHotkey("k", () => {
    if (hoverIndex > 0) {
      const newIndex = hoverIndex - 1;
      setHoverIndex(newIndex);
      scrollToIndex(newIndex);
    }
  });

  useHotkey("ArrowUp", () => {
    if (hoverIndex > 0) {
      const newIndex = hoverIndex - 1;
      setHoverIndex(newIndex);
      scrollToIndex(newIndex);
    }
  });

  const { setViewSampleId } = useSampleStore();
  return (
    <div className="w-full h-full overflow-auto px-4 pb-24">
      <Table className="w-full">
        <TableBody>
          {samples.map((sample: Sample, index: number) => (
            <TableRow
              ref={(el: any) => (rowRefs.current[index] = el)}
              onClick={() => setViewSampleId(sample.id)}
              onMouseOver={() => setHoverIndex(index)}
              key={sample.id}
              className={`${hoverIndex === index ? "bg-muted" : ""}`}
            >
              <TableCell className="p-2 w-[40px] ">
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium p-2 w-[100px] whitespace-nowrap">
                Sample {index}
              </TableCell>
              <TableCell className="p-2">
                <div className="flex gap-1 flex-wrap">
                  {sample.labels.map((label, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end space-x-1 gap-1">
                  <ThumbsDown
                    className={`h-4 w-4 pointer-events-none ${
                      sample.likedStatus === -1
                        ? "text-red-400"
                        : "text-muted-foreground"
                    }`}
                  />
                  <ThumbsUp
                    className={`h-4 w-4 pointer-events-none ${
                      sample.likedStatus === 1
                        ? "text-green-400"
                        : "text-muted-foreground"
                    }`}
                  />
                  {/* <CopyPlus className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                  <Trash className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" /> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DatasetTable;
