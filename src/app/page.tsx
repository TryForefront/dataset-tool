"use client";
import { ListFilter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DatasetTable from "@/components/DatasetTable";
import EmptyStateCard from "@/components/EmptyStateCard";
import { useSampleStore } from "@/store";
import ViewSample from "@/components/ViewSample";

export default function App() {
  const { samples, viewSampleId, resetViewSampleId } = useSampleStore();
  return (
    <main className="border rounded-xl bg-background flex h-full gap-8 flex-col flex-1 ">
      <div className="flex h-full items-start gap-4 md:gap-8">
        {samples.length == 0 && <EmptyStateCard />}
        {!viewSampleId && samples?.length > 0 && (
          <div className="h-full w-full items-start gap-4 md:gap-8 overflow-hidden">
            <CardHeader className=" px-4 sm:px-6 py-2 flex flex-row items-center justify-between border-b">
              <div className="flex flex-col ">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-medium">Samples</h2>
                  <span className="text-muted-foreground text-md">{`(${samples.length})`}</span>
                </div>
              </div>
              <div
                className="h-7 flex items-center gap-2"
                style={{ margin: 0 }}
              >
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
                    <DropdownMenuCheckboxItem>All</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Selected
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Liked
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Disliked
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      AI Generated
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>None</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Download</span>
                </Button>
              </div>
            </CardHeader>

            <div className="h-full overflow-auto flex-grow ">
              <DatasetTable samples={samples} />
            </div>
          </div>
        )}
        {viewSampleId && <ViewSample />}
      </div>
    </main>
  );
}
