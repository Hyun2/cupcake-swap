import styled from "@emotion/styled";

const Container = styled.div`
  border-radius: 10px;
  margin: 10px 0;
  background-color: #f9f7f1;
  padding: 10px;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
`;

const SwapPannel = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SwapPannel;
