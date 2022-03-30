import axios from "axios";
import { useEffect, useCallback } from "react";
import AssetsPannel from "../components/AssetsPannel";
// import AddressInput from "../components/AddressInput";
import NftCard from "../components/NftCard";
import NotConnected from "../components/NotConnected";
import Pannel from "../components/Pannel";
import SelectionBar from "../components/SelectionBar";
import StatusBar from "../components/StatusBar";
// import ThumbnailCard from "../components/ThumbnailCard";
import { useStore } from "../utils/store";

export default function Home() {
  const walletAddress = useStore((state) => state.walletAddress);

  return walletAddress ? <Connected /> : <NotConnected />;
}

const Connected = () => {
  const [myAssets, setMyAssets] = useStore((state) => [state.myAssets, state.setMyAssets]);
  const walletAddress = useStore((state) => state.walletAddress);
  const [swapStatus, setSwapStatus] = useStore((state) => [state.swapStatus, state.setSwapStatus]);

  const getNfts = useCallback(
    async (walletAddress) => {
      const {
        data: { assets },
      } = await axios.get(`https://api.opensea.io/api/v1/assets?owner=${walletAddress}`);
      // https://rinkeby-api.opensea.io/api/v1/assets?owner=0x6cD3dde9dFf947F8F42aa780D0CCE8f897E8DE5F
      console.log(assets);
      setMyAssets(assets.map((asset) => ({ ...asset, selected: false })));
    },
    [setMyAssets],
  );

  useEffect(() => {
    //https://api.opensea.io/api/v1/assets?owner=${address}
    walletAddress && getNfts(walletAddress);
  }, [getNfts, walletAddress]);

  return (
    <Pannel>
      {swapStatus && <SelectionBar />}
      {/* <ThumbnailCard src="https://openseauserdata.com/files/25a27e7885076582601e26d9f1d4296b.svg" /> */}
      <AssetsPannel>
        {myAssets.length > 0 &&
          myAssets.map((nft, idx) => {
            return nft?.image_url ? (
              <NftCard
                key={idx}
                contractAddr={nft.asset_contract?.address}
                tokenId={nft.id}
                selected={nft.selected}
                name={nft.name}
                collectionName={nft.collection?.name}
                src={nft.image_url}
              />
            ) : null;
          })}
      </AssetsPannel>
      {/* <AddressInput /> */}
      {swapStatus && <StatusBar text="Next" />}
    </Pannel>
  );
};
