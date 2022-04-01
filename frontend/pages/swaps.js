import { Text } from "@mantine/core";
import Link from "next/link";
import Pannel from "../components/Pannel";
import TradeItem from "../components/TradeItem";
import { swaps } from "../utils/dummy";

export default function Swaps() {
  return (
    <Pannel>
      {swaps.map((swap, idx) => (
        <Link href="/swap/1" passHref key={idx}>
          <TradeItem trade={swap} type="swap" />
          {/* <Text>xptm</Text> */}
        </Link>
      ))}
    </Pannel>
  );
}
