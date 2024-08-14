import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

import { get, set, del } from "idb-keyval";
import { storage } from "./useSampleStore";

interface AIState {
  provider: string;
  baseUrl: string;
  apiKeys: Record<string, string>;
  modelString: string;
  setProvider: (provider: string) => void;
  setBaseUrl: (baseUrl: string) => void;
  setApiKey: (provider: string, apiKey: string) => void;
  setModelString: (modelString: string) => void;
}

const useAIStore = create<AIState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      provider: "openai",
      baseUrl: "https://api.openai.com",
      apiKeys: {},
      modelString: "gpt-3.5-turbo",
      setProvider: (provider) => set({ provider }),
      setBaseUrl: (baseUrl) => set({ baseUrl }),
      setApiKey: (provider, apiKey) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: apiKey },
        })),
      setModelString: (modelString) => set({ modelString }),
    }),
    {
      name: "ai_config",
      storage: createJSONStorage(() => storage),
    }
  )
);

export default useAIStore;
