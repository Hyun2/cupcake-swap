import styled from "@emotion/styled";
import { Button, ScrollArea } from "@mantine/core";
import NftCard from "./NftCard";

const Container = styled.div`
  background-color: #f0eee8;
  border-radius: 0.25rem;
  margin-bottom: 20px;
  padding: 10px;
`;

const NftRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
`;

const NftList = styled(ScrollArea)`
  border: 1px solid lightgray;
  border-radius: 5px;
  // background-color: lightgray;
  padding: 10px 20px;
  display: flex;

  && .mantine-ScrollArea-viewport > div {
    display: flex !important;
    justify-content: center;
    column-gap: 20px;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;

  && button:not(:last-child) {
    margin-right: 15px;
  }
`;

const ProposalItem = ({ proposal }) => {
  return (
    <Container>
      <NftRow>
        <NftList>
          {proposal.user1?.nfts?.map((nft, idx) => (
            <NftCard
              key={idx}
              contractAddr={nft.address}
              tokenId={nft.id}
              // selected={nft.selected}
              // name={nft.name}
              // collectionName={nft.collection?.name}
              src={nft.imageUrl}
            />
          ))}
        </NftList>
        <NftList>
          {proposal.user2?.nfts?.map((nft, idx) => (
            <NftCard
              key={idx}
              contractAddr={nft.address}
              tokenId={nft.id}
              // selected={nft.selected}
              // name={nft.name}
              // collectionName={nft.collection?.name}
              src={nft.imageUrl}
            />
          ))}
        </NftList>
      </NftRow>
      <Bottom>
        <div>제안 상태: 제안 중 / 승인 / 거절</div>

        <div>
          <Button>승인</Button>
          <Button>거절</Button>
          <Button>수정</Button>
        </div>
      </Bottom>
    </Container>
  );
};

export default ProposalItem;
