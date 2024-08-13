import { create } from "zustand";

interface AIConfiguration {
  baseUrl: string;
  apiKey: string;
  modelString: string;
}

interface AIState {
  aiConfig: AIConfiguration;
  setAIConfig: (aiConfig: AIConfiguration) => void;
}

const useAIStore = create<AIState>((set) => ({
  aiConfig: {
    baseUrl: "",
    apiKey: "",
    modelString: "",
  },
  setAIConfig: (aiConfig) => set({ aiConfig }),
}));

export default useAIStore;
