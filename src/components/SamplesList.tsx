"use client";

import { ListFilter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DatasetTable from "@/components/DatasetTable";
import { useSampleStore } from "@/store";
import { Sample } from "@/store/useSampleStore";
import { useMemo } from "react";
import downloadDataset from "@/utils/downloadDataset";

const SamplesList = () => {
  const { samples, filter, setFilter, selectedSampleIds } = useSampleStore();

  const filterSamples = (samples: Sample[], filterType: string): Sample[] => {
    switch (filterType) {
      case "all":
        return samples;
      case "liked":
        return samples.filter((sample) => sample?.likedStatus === 1);
      case "disliked":
        return samples.filter((sample) => sample?.likedStatus === -1);
      case "ai_generated":
        return samples.filter((sample) =>
          sample?.labels.includes("ai_generated")
        );
      case "selected":
        return samples.filter((sample) =>
          selectedSampleIds.includes(sample.id)
        );
      default:
        return samples;
    }
  };

  const filteredSamples = useMemo(
    () => filterSamples(samples, filter),
    [samples, filter, selectedSampleIds]
  );
  return (
    <div className="h-full w-full items-start gap-4 md:gap-8 overflow-hidden">
      <CardHeader className=" px-4 sm:px-6 py-2 flex flex-row items-center justify-between border-b">
        <div className="flex flex-col ">
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center items-end">
              <h2 className="text-base font-medium">Samples</h2>
              <span className="text-muted-foreground text-md">{`${filteredSamples.length}`}</span>
            </div>
            <span className="text-muted-foreground/[0.7] text-xs">{`(${selectedSampleIds.length} selected)`}</span>
          </div>
        </div>
        <div className="h-7 flex items-center gap-2" style={{ margin: 0 }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-sm py-0 "
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filter === "all"}
                onCheckedChange={() => setFilter("all")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === "selected"}
                onCheckedChange={() => setFilter("selected")}
              >
                Selected
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === "liked"}
                onCheckedChange={() => setFilter("liked")}
              >
                Liked
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === "disliked"}
                onCheckedChange={() => setFilter("disliked")}
              >
                Disliked
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === "ai_generated"}
                onCheckedChange={() => setFilter("ai_generated")}
              >
                AI Generated
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <Download className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Download</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => downloadDataset(filteredSamples)}
              >
                {`Download current view (${filteredSamples.length})`}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  downloadDataset(
                    samples.filter((sample) =>
                      selectedSampleIds.includes(sample.id)
                    )
                  )
                }
              >
                {`Download selected (${selectedSampleIds.length})`}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <div className="h-full overflow-auto flex-grow ">
        <DatasetTable samples={filteredSamples} />
      </div>
    </div>
  );
};

export default SamplesList;
