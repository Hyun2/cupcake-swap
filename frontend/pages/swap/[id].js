import { Progress } from "@mantine/core";
import Pannel from "../../components/Pannel";
import TradeItem from "../../components/TradeItem";
import { swaps } from "../../utils/dummy";

const SwapDetail = () => {
  return (
    <div>
      <Progress
        animate
        mt="md"
        size="xl"
        radius="xl"
        sections={[
          { value: 25, color: "pink", label: "Request" },
          { value: 25, color: "grape", label: "Response" },
          { value: 0, color: "gray", label: "Accept" },
          { value: 0, color: "gray", label: "Completed" },
        ]}
      />
      <Pannel>
        {/* {swaps.map((swap, idx) => (
          <TradeItem trade={swap} key={idx} type="swapDetail" />
        ))} */}
        <TradeItem trade={swaps[0]} type="swapDetail" />
      </Pannel>
    </div>
  );
};

export default SwapDetail;
