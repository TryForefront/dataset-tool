import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

export const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    // console.log(name, "has been retrieved");
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    // console.log(name, "with value", value, "has been saved");
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    // console.log(name, "has been deleted");
    await del(name);
  },
};

export interface Message {
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
  setSamples: (samples: Sample[]) => void;

  filter: string;
  setFilter: (filter: string) => void;

  hoverIndex: number;
  setHoverIndex: (index: number) => void;

  viewSampleId: string | undefined;
  setViewSampleId: (sampleId: string | undefined) => void;
  resetViewSampleId: () => void;

  selectedSampleIds?: string[];
  selectSampleId?: (sampleId: string) => void;

  addSample: (sample: Sample) => void;
  updateSampleMessages: (sampleId: string, messages: Message[]) => void;
  // duplicateSampleById: (sampleId: string) => void;
  removeSampleById: (sampleId: string) => void;

  likeSampleById: (sampleId: string) => void;
  dislikeSampleById: (sampleId: string) => void;
  resetSampleLikeStatus: (sampleId: string) => void;

  // addLabelToSampleById: (sampleId: string, label: string) => void;
  // removeLabelFromSampleById: (sampleId: string, label: string) => void;
}

// import SAMPLE_DATA from "../constants/SAMPLE_DATA";

const useSampleStore = create<SampleState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      samples: [],
      setSamples: (samples) => set({ samples }),

      filter: "all",
      setFilter: (filter) => set({ filter }),

      hoverIndex: -1,
      setHoverIndex: (index) => set({ hoverIndex: index }),

      viewSampleId: undefined,
      setViewSampleId: (sampleId) => set({ viewSampleId: sampleId }),
      resetViewSampleId: () => set({ viewSampleId: undefined }),

      addSample: (sample) =>
        set((state) => ({ samples: [...state.samples, sample] })),
      selectedSampleIds: [],
      selectSampleId: (sampleId) =>
        set((state: any) => {
          const currentSelectedIds = state.selectedSampleIds || [];
          const updatedSelectedIds = currentSelectedIds.includes(sampleId)
            ? currentSelectedIds.filter((id: string) => id !== sampleId)
            : [...currentSelectedIds, sampleId];
          return { selectedSampleIds: updatedSelectedIds };
        }),
      updateSampleMessages: (sampleId, messages) =>
        set((state: any) => {
          const sample = state?.samples?.find(
            (s: Sample) => s?.id === sampleId
          );
          if (!sample) return;
          return {
            ...state,
            samples: state.samples.map((s: Sample) =>
              s.id === sampleId ? { ...s, messages } : s
            ),
          };
        }),
      // duplicateSampleById: (sampleId) =>
      //   set((state) => {
      //     const sample = state.samples.find((s) => s.id === sampleId);
      //     if (!sample) return;
      //     set({
      //       samples: [...state.samples, { ...sample, id: `${sample.id}_copy` }],
      //     });
      //   }),
      removeSampleById: (sampleId) =>
        set((state) => ({
          samples: state.samples.filter((s) => s.id !== sampleId),
        })),
      likeSampleById: (sampleId) => {
        set((state: any) => {
          const sample = state?.samples?.find(
            (s: Sample) => s?.id === sampleId
          );
          if (!sample) return;
          return {
            ...state,
            samples: state?.samples?.map((s: Sample) =>
              s?.id === sampleId ? { ...s, likedStatus: 1 } : s
            ),
          };
        });
      },
      dislikeSampleById: (sampleId) =>
        set((state: any) => {
          console.log("DISLIKING ACTION");
          console.log(sampleId);
          const sample = state.samples.find((s: Sample) => s.id === sampleId);
          console.log(sample);
          if (!sample) return;
          // set({
          //   samples: state.samples.map((s) =>
          //     s.id == sampleId ? { ...s, likedStatus: -1 } : s
          //   ),
          // });
          return {
            ...state,
            samples: state?.samples?.map((s: Sample) =>
              s?.id === sampleId ? { ...s, likedStatus: -1 } : s
            ),
          };
        }),
      resetSampleLikeStatus: (sampleId) =>
        set((state: any) => {
          const sample = state?.samples?.find(
            (s: Sample) => s?.id === sampleId
          );
          if (!sample) return;
          return {
            ...state,
            samples: state?.samples?.map((s: Sample) =>
              s?.id === sampleId ? { ...s, likedStatus: 0 } : s
            ),
          };
        }),

      // addLabelToSampleById: (sampleId, label) =>
      //   set((state) => {
      //     const sample = state.samples.find((s) => s.id === sampleId);
      //     if (!sample) return;
      //     set({
      //       samples: state.samples.map((s) =>
      //         s.id === sampleId ? { ...s, labels: [...s.labels, label] } : s
      //       ),
      //     });
      //   }),
      // removeLabelFromSampleById: (sampleId, label) =>
      //   set((state: any) => {
      //     const sample = state.samples.find((s) => s.id === sampleId);
      //     if (!sample) return;
      //     set({
      //       samples: state.samples.map((s) =>
      //         s.id === sampleId
      //           ? { ...s, labels: s.labels.filter((l) => l !== label) }
      //           : s
      //       ),
      //     });
      //   }),
    }),
    {
      name: "samples",
      storage: createJSONStorage(() => storage),
    }
  )
);

export default useSampleStore;
