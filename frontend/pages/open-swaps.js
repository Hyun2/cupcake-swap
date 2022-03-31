import axios from "axios";
import SwapPannel from "../components/SwapPannel";
import { useState, useEffect, useCallback } from "react";
import { useStore } from "../utils/store";
import NftSwapCard from "../components/NftSwapCard";
import SwapIcon from "../components/SwapIcon";
import Web3 from "web3";

const OpenSwaps = () => {
  // return <div>open swaps</div>;
  const [myNfts, setMyNfts] = useState([]);
  const [targetNfts, setTargetNfts] = useState([]);
  const walletAddress = useStore((state) => state.walletAddress);
  const [swapId, setSwapId] = useState(null);

  const getMyNfts = useCallback(async (walletAddress) => {
    const {
      data: { assets },
    } = await axios.get(`https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}`);
    console.log(assets);
    setMyNfts(assets);
  }, []);

  const getTargetNfts = useCallback(async (swapId) => {
    const {
      data: { assets },
    } = await axios.get(`https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}`);
    console.log("get data : ", assets);
    setTargetNfts(assets);
  }, []);

  useEffect(() => {
    console.log(getTargetNfts);
    //https://api.opensea.io/api/v1/assets?owner=${address}
    walletAddress && getMyNfts(walletAddress) && getTargetNfts(walletAddress);
  }, [getMyNfts, getTargetNfts, walletAddress]);
  return (
    <>
      <SwapPannel
        children={
          <>
            <div>
              {myNfts.length > 0 &&
                myNfts.map((nft, idx) => {
                  return nft.image_url ? (
                    <NftSwapCard key={idx} name={nft.name} collectionName={nft.collection?.name} src={nft.image_url} />
                  ) : null;
                })}
            </div>
            <SwapIcon />
            <div>
              {targetNfts.length > 0 &&
                targetNfts.map((nft, idx) => {
                  return nft.image_url ? (
                    <NftSwapCard key={idx} name={nft.name} collectionName={nft.collection?.name} src={nft.image_url} />
                  ) : null;
                })}
            </div>
          </>
        }
      ></SwapPannel>
    </>
  );
};

export default OpenSwaps;
