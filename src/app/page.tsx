"use client";

import EmptyStateCard from "@/components/EmptyStateCard";
import { useSampleStore } from "@/store";
import ViewSample from "@/components/ViewSample";
import SamplesList from "@/components/SamplesList";

export default function App() {
  const { samples, viewSampleId, resetViewSampleId } = useSampleStore();
  return (
    <main className="border rounded-xl bg-background flex h-full gap-8 flex-col flex-1 ">
      <div className="flex h-full items-start gap-4 md:gap-8">
        {samples.length == 0 && <EmptyStateCard />}
        {!viewSampleId && samples?.length > 0 && <SamplesList />}
        {viewSampleId && <ViewSample />}
      </div>
    </main>
  );
}
