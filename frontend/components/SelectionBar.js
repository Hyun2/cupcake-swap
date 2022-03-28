import styled from "@emotion/styled";
import ThumbnailCard from "./ThumbnailCard";

const Container = styled.div`
  background-color: #f0eee8;
  border-radius: 0.25rem;
  margin: 15px 0px;
  padding: 10px;
`;

const SelectionBar = () => {
  return (
    <Container>
      <div>SelectionBar</div>
      <ThumbnailCard />
    </Container>
  );
};

export default SelectionBar;
