import { Button, Text } from "@mantine/core";
import Link from "next/link";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  & > button {
    margin-right: 15px !important;
  }
`;

const Menu = () => {
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
        <Button variant="default">
          <Link href="/create-swap" passHref>
            <Text>Create Swap</Text>
          </Link>
        </Button>
      </div>
    </Container>
  );
};

export default Menu;
