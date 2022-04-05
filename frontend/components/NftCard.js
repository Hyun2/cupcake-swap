import styled from "@emotion/styled";
import { useStore } from "../utils/store";
// import Image from "next/image";

const Container = styled.div`
  width: 238px;
  height: 338px;
  background-color: white;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  cursor: ${(props) => (props.pointer ? "pointer" : "default")};

  border: ${(props) => (props.selected ? `1px solid #66a64f;` : null)};
  opacity: ${(props) => (props.selected ? "0.6" : "1")};
`;

const CImage = styled.img`
  border-radius: 0.25rem;
  width: 218px;
  height: 218px;
`;

const Contents = styled.div`
  text-align: center;
`;

const NftCard = ({ contractAddr, tokenId, selected, src, name, collectionName }) => {
  // const myAssets = useStore((state) => state.myAssets);
  const toggleSelectAsset = useStore((state) => state.toggleSelectAsset);
  const swapStatus = useStore((state) => state.swapStatus);

  // useEffect(() => {
  //   console.log(myAssets);
  // }, [myAssets]);


  return (
    <Container
      onClick={() => {
        toggleSelectAsset({ contractAddr, tokenId });
      }}
      selected={selected}
      pointer={swapStatus}
    >
      {/* <CImage width="218" height="218" src={src} alt="" /> */}
      <CImage src={src} alt="" />
      <Contents>
        <div>{collectionName}</div>
        <div>{name}</div>
      </Contents>
    </Container>
  );
};

export default NftCard;
