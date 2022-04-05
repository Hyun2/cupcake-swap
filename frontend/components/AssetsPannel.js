import styled from "@emotion/styled";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
`;

const AssetsPannel = ({ children }) => {
  
  return <Container>{children}</Container>;
};

export default AssetsPannel;
