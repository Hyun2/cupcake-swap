import create from "zustand";

export const useStore = create((set) => ({
  web3: null,
  setWeb3: (web3) => set({ web3 }),

  walletAddress: null,
  setWalletAddress: (walletAddress) => set({ walletAddress }),

  swapStatus: false,
  setSwapStatus: (swapStatus) => set({ swapStatus }),

  selectedAssets: [],
  setSelectedAssets: (selectedAssets) => set({ selectedAssets }),
}));
