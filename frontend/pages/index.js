import AddressInput from "../components/AddressInput";
import NftCard from "../components/NftCard";
import ThumbnailCard from "../components/ThumbnailCard";

export default function Home() {
  return (
    <div>
      <ThumbnailCard src="https://openseauserdata.com/files/25a27e7885076582601e26d9f1d4296b.svg" />
      <NftCard src="https://openseauserdata.com/files/25a27e7885076582601e26d9f1d4296b.svg" />
      <AddressInput />
    </div>
  );
}
