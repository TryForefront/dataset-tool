import { create } from "zustand";

interface Message {
  role: string;
  content: string;
}
interface Version {
  v: number;
  messages: Message[];
}

export interface Sample {
  id: string;
  messages: Message[];
  likedStatus: -1 | 0 | 1;
  labels: string[];
  versions?: Version[];
}

interface SampleState {
  samples: Sample[];
  selectedSampleIds?: string[];
  selectSampleId?: (sampleId: string[]) => void;
  setSamples: (samples: Sample[]) => void;
  addSample: (sample: Sample) => void;
  duplicateSampleById: (sampleId: string) => void;
  removeSampleById: (sampleId: string) => void;
  addLabelToSampleById: (sampleId: string, label: string) => void;
  removeLabelFromSampleById: (sampleId: string, label: string) => void;
}

import SAMPLE_DATA from "../constants/SAMPLE_DATA";

const useSampleStore = create<SampleState>((set) => ({
  samples: SAMPLE_DATA,
  setSamples: (samples) => set({ samples }),
  addSample: (sample) =>
    set((state) => ({ samples: [...state.samples, sample] })),
  selectedSampleIds: [],
  selectSampleId: (sampleId) =>
    set((state) => {
      const currentSelectedIds = state.selectedSampleIds || [];
      const updatedSelectedIds = currentSelectedIds.includes(sampleId)
        ? currentSelectedIds.filter((id) => id !== sampleId)
        : [...currentSelectedIds, sampleId];
      return { selectedSampleIds: updatedSelectedIds };
    }),
  duplicateSampleById: (sampleId) =>
    set((state) => {
      const sample = state.samples.find((s) => s.id === sampleId);
      if (!sample) return;
      set({
        samples: [...state.samples, { ...sample, id: `${sample.id}_copy` }],
      });
    }),
  removeSampleById: (sampleId) =>
    set((state) => ({
      samples: state.samples.filter((s) => s.id !== sampleId),
    })),
  addLabelToSampleById: (sampleId, label) =>
    set((state) => {
      const sample = state.samples.find((s) => s.id === sampleId);
      if (!sample) return;
      set({
        samples: state.samples.map((s) =>
          s.id === sampleId ? { ...s, labels: [...s.labels, label] } : s
        ),
      });
    }),
  removeLabelFromSampleById: (sampleId, label) =>
    set((state) => {
      const sample = state.samples.find((s) => s.id === sampleId);
      if (!sample) return;
      set({
        samples: state.samples.map((s) =>
          s.id === sampleId
            ? { ...s, labels: s.labels.filter((l) => l !== label) }
            : s
        ),
      });
    }),
}));

export default useSampleStore;