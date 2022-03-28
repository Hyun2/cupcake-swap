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
  const [startSwapStatus, setStartSwapStatus] = useStore((state) => [state.startSwapStatus, state.setStartSwapStatus]);

  return (
    <Container>
      <Left>
        <Button variant="light">
          <Link href="/" passHref>
            <Text>your NFTs</Text>
          </Link>
        </Button>
        <Button variant="light">
          <Link href="/open-swaps" passHref>
            <Text>Open Swaps</Text>
          </Link>
        </Button>
        <Button variant="light">
          <Link href="/recent-swaps" passHref>
            <Text>Recent Swaps</Text>
          </Link>
        </Button>
      </Left>

      <div>
        {startSwapStatus ? (
          <Button
            onClick={() => {
              setStartSwapStatus(false);
            }}
            variant="default"
          >
            <Text>Cancel Swap</Text>
          </Button>
        ) : (
          <Button
            onClick={() => {
              setStartSwapStatus(true);
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
