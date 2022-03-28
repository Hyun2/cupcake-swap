import styled from "@emotion/styled";

const Container = styled.div`
  border-radius: 10px;
  margin: 10px 0;
  background-color: #f9f7f1;
  padding: 10px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
`;

const Pannel = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Pannel;
