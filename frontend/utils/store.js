import create from "zustand";

export const useStore = create((set) => ({
  web3: null,
  setWeb3: (web3) => set({ web3 }),

  walletAddress: null,
  setWalletAddress: (walletAddress) => set({ walletAddress }),

  swapStatus: false,
  setSwapStatus: (swapStatus) => set({ swapStatus }),

  updateProposalStatus: false,
  setUpdateProposalStatus: (updateProposalStatus) => set({ updateProposalStatus }),

  myAssets: [],
  setMyAssets: (myAssets) => set({ myAssets }),
  toggleSelectAsset: ({ contractAddr, tokenId }) => {
    return set((state) => {
      if (!state.swapStatus && !state.updateProposalStatus) {
        console.log("1");
        return;
      }
      return {
        myAssets: state.myAssets.map((asset) => {
          if (asset.asset_contract?.address === contractAddr && asset.token_id === tokenId) {
            return {
              ...asset,
              selected: !asset.selected,
            };
          }
          return asset;
        }),
      };
    });
  },
}));
