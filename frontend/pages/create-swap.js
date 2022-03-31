import AssetsPannel from "../components/AssetsPannel";
import NftCard from "../components/NftCard";
import Pannel from "../components/Pannel";
import StatusBar from "../components/StatusBar";
import { useStore } from "../utils/store";

const CreateSwap = () => {
  const swapStatus = useStore((state) => state.swapStatus);
  const myAssets = useStore((state) => state.myAssets);
  return (
    <Pannel>
      {/* <ThumbnailCard src="https://openseauserdata.com/files/25a27e7885076582601e26d9f1d4296b.svg" /> */}
      <AssetsPannel>
        {myAssets.length > 0 &&
          myAssets.map((nft, idx) => {
            return nft?.image_url ? (
              <NftCard key={idx} nft={nft} name={nft.name} collectionName={nft.collection?.name} src={nft.image_url} />
            ) : null;
          })}
      </AssetsPannel>
      {/* <AddressInput /> */}
      {swapStatus && <StatusBar text="Create Swap" />}
    </Pannel>
  );
};

export default CreateSwap;
