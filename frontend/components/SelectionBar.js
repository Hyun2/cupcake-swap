import styled from "@emotion/styled";
import { Text } from "@mantine/core";
import { useStore } from "../utils/store";
import ThumbnailCard from "./ThumbnailCard";

const Container = styled.div`
  background-color: #f0eee8;
  border-radius: 0.25rem;
  margin-bottom: 20px;
  padding: 10px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
`;

const SelectionBar = () => {
  const myAssets = useStore((state) => state.myAssets);

  return (
    <>
      <div style={{ marginBottom: "15px" }}>Selected: 0</div>
      <Container>
        <ThumbnailCard>
          <Text>ETH</Text>
        </ThumbnailCard>
        {myAssets.map((nft, idx) => {
          if (nft.selected) {
            return <ThumbnailCard src={nft.image_url} key={idx} />;
          }
          return null;
        })}
      </Container>
    </>
  );
};

export default SelectionBar;
