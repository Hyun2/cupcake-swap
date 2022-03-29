import axios from "axios";
import Pannel from "../components/Pannel";
import { useState, useEffect, useCallback } from "react";
import { useStore } from "../utils/store";
import NftSwapCard from "../components/NftCard";
import Web3 from "web3";

const OpenSwaps = () => {
  // return <div>open swaps</div>;
  const [nfts, setNfts] = useState([]);
  const [targetNfts, setTargetNfts] = useState([]);
  const walletAddress = useStore((state) => state.walletAddress);

  const getNfts = useCallback(async (walletAddress) => {
    const {
      data: { assets },
    } = await axios.get(`https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}`);
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
        {nfts.length > 0 &&
          nfts.map((nft, idx) => {
            return nft.image_url ? (
              <NftSwapCard key={idx} name={nft.name} collectionName={nft.collection?.name} src={nft.image_url} />
            ) : null;
          })}
      </Pannel>
    </>
  );
};

export default OpenSwaps;
