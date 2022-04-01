import Link from "next/link";
import Pannel from "../components/Pannel";
import TradeItem from "../components/TradeItem";
import { proposals } from "../utils/dummy";

export default function Proposals() {
  return (
    <Pannel>
      {proposals.map((proposal, idx) => (
        <Link href="/proposal/1" passHref key={idx}>
          <TradeItem trade={proposal} type="proposal" />
          {/* <Text>xptm</Text> */}
        </Link>
      ))}
    </Pannel>
  );
}
