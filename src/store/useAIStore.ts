import { create } from "zustand";

interface AIState {
  provider: string;
  baseUrl: string;
  apiKey: string;
  modelString: string;
  setProvider: (provider: string) => void;
  setBaseUrl: (baseUrl: string) => void;
  setApiKey: (apiKey: string) => void;
  setModelString: (modelString: string) => void;
}

const useAIStore = create<AIState>((set) => ({
  provider: "openai",
  baseUrl: "https://api.openai.com",
  apiKey: "",
  modelString: "gpt-3.5-turbo",
  setProvider: (provider) => set({ provider }),
  setBaseUrl: (baseUrl) => set({ baseUrl }),
  setApiKey: (apiKey) => set({ apiKey }),
  setModelString: (modelString) => set({ modelString }),
}));

export default useAIStore;
