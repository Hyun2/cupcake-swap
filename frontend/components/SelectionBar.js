import styled from "@emotion/styled";
import ThumbnailCard from "./ThumbnailCard";

const Container = styled.div`
  background-color: #f0eee8;
  border-radius: 0.25rem;
  margin-bottom: 20px;
  padding: 10px;
`;

const SelectionBar = () => {
  return (
    <Container>
      <div style={{ marginBottom: "15px" }}>Selected: 0</div>
      <ThumbnailCard />
    </Container>
  );
};

export default SelectionBar;
