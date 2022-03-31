import styled from "@emotion/styled";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
// import Image from "next/image";

const Container = styled.div`
  border-radius: 10.5rem;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const SwapIcon = () => {
  return (
    <Container>
      <span style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
        <MdOutlineSwapHorizontalCircle style={{ width: 45, height: 45 }} />
      </span>
    </Container>
  );
};

export default SwapIcon;
