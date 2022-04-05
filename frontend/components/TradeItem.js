import React from "react";
import styled from "@emotion/styled";
import { Button, ScrollArea, Text } from "@mantine/core";
import Link from "next/link";
import NftCard from "./NftCard";
import axios from "axios";
import { useState } from "react/cjs/react.development";

const Container = styled.div`
  background-color: #f0eee8;
  border-radius: 0.25rem;
  margin-bottom: 20px;
  padding: 10px;

  &:hover {
    cursor: ${(props) => (props.type === "swap" ? "pointer" : "default")};
    transform: ${(props) => (props.type === "swap" ? "translateY(-2px)" : null)};
    box-shadow: ${(props) => (props.type === "swap" ? "rgb(4 17 29 / 25%) 0px 0px 8px 0px" : null)};
    transition: ${(props) => (props.type === "swap" ? "all 0.1s ease 0s" : null)};
  }
}

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

async function action(action) { 
  if (action === "승인") {
    // 서버에서 상태변수를 accept로 변경합시다.
    const result = await axios.patch(`http://localhost:5000/proposals/accept`, { proposalID: 1 });
    if (result.data === "success") {
      console.log('승인되었습니다.');
    } else {
      console.log('accept 반응에 실패했습니다.');
      return
    }
  
  } else if (action === "거절") {
    //서버상태를 reject로 변경합니다.

    const result = await axios.patch(`http://localhost:5000/proposals/reject`, { proposalID: 1 });
    if (result.data === "success") {
      console.log('reject가 승인되었습니다.');
    } else {
      console.log('reject 실패했습니다.');
      return
    }
  } else if (action === "중지 ") {
    //역제안으로써 다시 서버데이터를 변경해야 합니다.
  } else {
    //아무것도 해당되지 않기때문에 함수를 종료시킵니다.
    return;
  }
}

// eslint-disable-next-line react/display-name
const TradeItem = React.forwardRef(({ trade, type, onClick, href }, ref) => {
  //user1 과 user2 로 데이터를 구분지업봅시다.
  
  const [data, setData] = useState();
  const [user1, setUser1] = useState({});
  const [user2, setUser2] = useState({});

  
  return (
    <Container type={type} onClick={onClick} href={href} ref={ref}>
      <NftRow>
        <NftList>
          {trade.user1?.nfts?.map((nft, idx) => (
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
          {trade.user2?.nfts?.map((nft, idx) => (
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
        {type === "proposal" && <div>제안 상태: 제안 중 / 승인 / 거절</div>}
        {type === "proposalDetail" && <div>제안 상태: 제안 중 / 승인 / 거절</div>}
        {type === "swap" && <div>스왑 상태: Request / Response / Accept / Completed / Canceled</div>}
        {type === "swapDetail" && <div>스왑 상태: Request / Response / Accept / Completed / Canceled</div>}

        {(type === "proposal" || type === "proposalDetail") && (
          <div>
            <Button onClick={() => { action('승인')}}>승인</Button>
            <Button onClick={() => { action('거절')}}>거절</Button>
            <Button>
              <Link href="/proposal/1" passHref>
                <Text>수정</Text>
              </Link>
            </Button>
          </div>
        )}
        {type === "swapDetail" && (
          <div>
            <Button>Request</Button>
            <Button>Response</Button>
            <Button>Accept</Button>
          </div>
        )}
      </Bottom>
    </Container>
  );
});

export default TradeItem;
