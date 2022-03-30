import { Button, Text } from "@mantine/core";
import Link from "next/link";
import styled from "@emotion/styled";
import { useStore } from "../utils/store";

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  & button:not(:last-child) {
    margin-right: 15px !important;
  }
`;

const Left = styled.div``;

const Menu = () => {
  const [swapStatus, setSwapStatus] = useStore((state) => [state.swapStatus, state.setSwapStatus]);
  const [myAssets, setMyAssets] = useStore((state) => [state.myAssets, state.setMyAssets]);

  return (
    <Container>
      <Left>
        <Button variant="light">
          <Link href="/" passHref>
            <Text>your NFTs</Text>
          </Link>
        </Button>
        <Button variant="light">
          <Link href="/proposals" passHref>
            <Text>Proposals</Text>
          </Link>
        </Button>
        <Button variant="light">
          <Link href="/swaps" passHref>
            <Text>Swaps</Text>
          </Link>
        </Button>
      </Left>

      <div>
        {swapStatus ? (
          <Button
            onClick={() => {
              setSwapStatus(false);
              setMyAssets(myAssets.map((asset) => ({ ...asset, selected: false })));
            }}
            variant="default"
          >
            <Text>Cancel Swap</Text>
          </Button>
        ) : (
          <Button
            onClick={() => {
              setSwapStatus(true);
            }}
            variant="default"
          >
            <Text>Start Swap</Text>
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Menu;
