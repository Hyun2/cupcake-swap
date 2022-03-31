import styled from "@emotion/styled";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
// import Image from "next/image";

const Container = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const SwapButton = () => {
  return (
    <Container>
      <MdOutlineSwapHorizontalCircle style={{ width: 45, height: 45 }} />
    </Container>
  );
};

export default SwapButton;
