import Pannel from "../components/Pannel";
import TradeItem from "../components/TradeItem";
import { proposals } from "../utils/dummy";

export default function Proposals() {
  return (
    <Pannel>
      {proposals.map((proposal, idx) => (
        <TradeItem trade={proposal} type="proposal" key={idx} />
      ))}
    </Pannel>
  );
}
