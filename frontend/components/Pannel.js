import styled from "@emotion/styled";

const Container = styled.div`
  border-radius: 10px;
  margin: 10px 0;
  background-color: #f9f7f1;
  padding: 10px;
  min-height: 500px;
`;

const Pannel = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Pannel;
