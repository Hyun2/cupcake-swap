import styled from "@emotion/styled";
import { Button, Text } from "@mantine/core";
import Link from "next/link";

const Container = styled.div`
  background-color: #f0eee8;
  border-radius: 0.25rem;
  padding: 10px;
  margin-top: 10px;

  display: flex;
  justify-content: space-between;
`;

const StatusBar = ({ text }) => {
  return (
    <Container>
      <Text>스테이터스 바</Text>
      <Button>
        <Link href="/create-swap" passHref>
          <Text>{text}</Text>
        </Link>
      </Button>
    </Container>
  );
};

export default StatusBar;
