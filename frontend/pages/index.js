import { Button, Text } from "@mantine/core";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import AssetsPannel from "../components/AssetsPannel";
// import AddressInput from "../components/AddressInput";
import NftCard from "../components/NftCard";
import NotConnected from "../components/NotConnected";
import Pannel from "../components/Pannel";
import SelectionBar from "../components/SelectionBar";
// import ThumbnailCard from "../components/ThumbnailCard";
import { useStore } from "../utils/store";

export default function Home() {
  const walletAddress = useStore((state) => state.walletAddress);

  return walletAddress ? <Connected /> : <NotConnected />;
}

const Connected = () => {
  const [nfts, setNfts] = useState([]);
  const walletAddress = useStore((state) => state.walletAddress);
  const [startSwapStatus, setStartSwapStatus] = useStore((state) => [state.startSwapStatus, setStartSwapStatus]);

  const getNfts = useCallback(async (walletAddress) => {
    const {
      data: { assets },
    } = await axios.get(`https://api.opensea.io/api/v1/assets?owner=${walletAddress}`);
    console.log(assets);
    setNfts(assets);
  }, []);

  useEffect(() => {
    //https://api.opensea.io/api/v1/assets?owner=${address}
    walletAddress && getNfts(walletAddress);
  }, [getNfts, walletAddress]);

  return (
    <>
      <Pannel>
        {startSwapStatus && <SelectionBar />}
        {/* <ThumbnailCard src="https://openseauserdata.com/files/25a27e7885076582601e26d9f1d4296b.svg" /> */}
        <AssetsPannel>
          {nfts.length > 0 &&
            nfts.map((nft, idx) => {
              return nft.image_url ? (
                <NftCard key={idx} name={nft.name} collectionName={nft.collection?.name} src={nft.image_url} />
              ) : null;
            })}
        </AssetsPannel>
        {/* <AddressInput /> */}
      </Pannel>
    </>
  );
};
