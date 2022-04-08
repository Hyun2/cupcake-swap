import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pannel from "../components/Pannel";
import TradeItem from "../components/TradeItem";
//import { proposals } from "../utils/dummy";


//DB에서 data를  데이터를 처리해 보자.
export default function Proposals() {

  const [data, setData] = useState([]);
   useEffect(async () => {
     const rawData = await axios.get(`http://localhost:5000/proposals/`)
     setData(rawData.data.data);
   }, []);


  return (
    <Pannel>
      {data.map((nft, idx) => (
        <Link href={`/proposal/${nft.proposalId}`} passHref key={idx}>
          <TradeItem trade={nft} type="proposal" />
          {/* <Text>xptm</Text> */}
        </Link>
      ))}
    </Pannel>
  );
}
