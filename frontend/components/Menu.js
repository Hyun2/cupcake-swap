import { Button, Text } from "@mantine/core";
import Link from "next/link";
import styled from "@emotion/styled";

const Container = styled.div`
  & > button {
    margin-right: 15px !important;
  }
`;

const Menu = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default Menu;
