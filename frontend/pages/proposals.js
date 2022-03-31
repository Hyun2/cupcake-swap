import Pannel from "../components/Pannel";
import ProposalItem from "../components/ProposalItem";
import { proposals } from "../utils/dummy";

export default function Proposals() {
  return (
    <Pannel>
      {proposals.map((proposal, idx) => (
        <ProposalItem proposal={proposal} key={idx} />
      ))}
    </Pannel>
  );
}
