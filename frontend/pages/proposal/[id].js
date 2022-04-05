import axios from "axios";
import { useRouter,useParams } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AssetsPannel from "../../components/AssetsPannel";
import NftCard from "../../components/NftCard";
import Pannel from "../../components/Pannel";
import TradeItem from "../../components/TradeItem";
import { proposals } from "../../utils/dummy";
import { useStore } from "../../utils/store";

export default function ProposalDetail() {
  const [myAssets, setMyAssets] = useStore((state) => [state.myAssets, state.setMyAssets]);
  const walletAddress = useStore((state) => state.walletAddress);
  const setUpdateProposalStatus = useStore((state) => state.setUpdateProposalStatus);
  const [nfts, setNft] = useState("");
  // zustand 상태변수 라이브러리 사용! 
  

  //params 가져오는 부분
  const router = useRouter();
  const { id } = router.query;
 
  
  useEffect(async () => {

    setUpdateProposalStatus(true);
    //undefind일때는 안되게!
    if (id) {
      const serverAsset = await axios.get(`http://localhost:5000/proposals/proposal/${id}`);
      setNft(serverAsset.data.user1.nfts)
      //await axios.get(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${walletAddress}`)
    }
  
  
  }, [id]);
   
  

   
  // const getNfts = useCallback(
  //   async (walletAddress) => {
  //      const {
  //         data: { assets },
  //       } = await axios.get(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${walletAddress}`);
  //      // https://rinkeby-api.opensea.io/api/v1/assets?owner=0x6cD3dde9dFf947F8F42aa780D0CCE8f897E8DE5F
  //     const newAssets = assets.map((asset) => {
  //       if (proposals[0].user1.address === walletAddress) {
  //         const nft = proposals[0].user1.nfts.filter((nft) => {
  //           if (nft.address === asset.asset_contract?.address && nft.id === asset.token_id) {
  //             return true;
  //           }
  //         });
  //         if (nft.length > 0) {
  //           return { ...asset, selected: true };
  //         }
  //       } else if (proposals[0].user2.address === walletAddress) {
  //         const nft = proposals[0].user2.nfts.filter((nft) => {
  //           if (nft.address === asset.asset_contract?.address && nft.id === asset.token_id) {
  //             return true;
  //           }
  //         });
  //         if (nft.length > 0) return { ...asset, selected: true };
  //       }

  //       return { ...asset, selected: false };
  //     });

  //     setMyAssets(newAssets);
  //   },
  //   [setMyAssets],
  // );

  // useEffect(() => {
  //   //https://api.opensea.io/api/v1/assets?owner=${address}
  //   walletAddress && getNfts(walletAddress);
  // }, [getNfts, walletAddress]);
   
 console.log(nfts);
  return (
    <>
      <Pannel>
        {/* <ThumbnailCard src="https://openseauserdata.com/files/25a27e7885076582601e26d9f1d4296b.svg" /> */}
        <AssetsPannel>
          {nfts.length > 0 &&
            nfts.map((nft, idx) => {
              return nft?.image_url ? (
                <NftCard
                  key={idx}
                  contractAddr={nft.asset_contract?.address}
                  tokenId={nft.token_id}
                  selected={nft.selected}
                  name={nft.name}
                  collectionName={nft.collection?.name}
                  src={nft.image_url}
                />
              ) : null;
            })}
        </AssetsPannel>
        {/* <AddressInput /> */}
        {/* {swapStatus && <StatusBar text="Next" />} */}
      </Pannel>

      <Pannel>
        <TradeItem trade={proposals[0]} type="proposalDetail" />
        {/* {proposals.map((proposal, idx) => (
          <TradeItem proposal={proposal} key={idx} />
        ))} */}
      </Pannel>
    </>
  );
}
