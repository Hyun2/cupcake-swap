import styled from "@emotion/styled";
// import Image from "next/image";

const Container = styled.div`
  width: 405px;
  height: 150px;
  background-color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px;
`;

const ImageContainer = styled.div`
  border-radius: 0.25rem !important;
  display: flex;
  justify-content: left;
  height: 100px;
  padding: 8px;
`;

const CImage = styled.img`
  border-radius: 0.25rem;
  width: 100px;
  height: 100px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NftSwapCard = ({ src, name, collectionName }) => {
  return (
    <Container>
      {/* <CImage width="218" height="218" src={src} alt="" /> */}
      <ImageContainer>
        <CImage src={src} alt="" />
        <Contents>
          <div>{collectionName}</div>
          <div>{name}</div>
        </Contents>
      </ImageContainer>
    </Container>
  );
};

export default NftSwapCard;
