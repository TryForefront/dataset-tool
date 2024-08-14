import React, { useRef, useCallback, useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CopyPlus, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import { useSampleStore } from "@/store";
import { Sample } from "@/store/useSampleStore";
import useHotkey from "@/hooks/useHotkey";

const BATCH_SIZE = 20; // Number of items to load at a time

const DatasetTable = ({ samples: initialSamples }: any) => {
  const [displayedSamples, setDisplayedSamples] = useState(
    initialSamples.slice(0, BATCH_SIZE)
  );
  const [currentIndex, setCurrentIndex] = useState(BATCH_SIZE);
  const { hoverIndex, setHoverIndex, setViewSampleId } = useSampleStore();
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const rowRefs = useRef({});

  const loadMoreItems = useCallback(() => {
    if (currentIndex >= initialSamples.length) return;

    const nextBatch = initialSamples.slice(
      currentIndex,
      currentIndex + BATCH_SIZE
    );
    setDisplayedSamples((prevSamples: Sample[]) => [
      ...prevSamples,
      ...nextBatch,
    ]);
    setCurrentIndex((prevIndex) => prevIndex + BATCH_SIZE);
  }, [currentIndex, initialSamples]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreItems();
      }
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMoreItems]);

  useHotkey("Enter", () => {
    if (hoverIndex > -1 && displayedSamples[hoverIndex]) {
      setViewSampleId(displayedSamples[hoverIndex].id);
    }
  });

  const scrollToIndex = (index: number) => {
    if ((rowRefs as any)?.current?.[index]) {
      (rowRefs as any)?.current?.[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useHotkey("j", () => {
    if (hoverIndex < displayedSamples.length - 1) {
      const newIndex = hoverIndex + 1;
      setHoverIndex(newIndex);
      scrollToIndex(newIndex);
    }
  });

  useHotkey("ArrowDown", () => {
    if (hoverIndex < displayedSamples.length - 1) {
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

  return (
    <div ref={containerRef} className="w-full h-full overflow-auto px-4 pb-24">
      <Table className="w-full">
        <TableBody>
          {displayedSamples.map((sample: Sample, index: number) => (
            <TableRow
              ref={(el: any) => ((rowRefs as any)!.current[index] = el)}
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
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};

export default DatasetTable;
