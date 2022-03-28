import styled from "@emotion/styled";
// import Image from "next/image";

const Container = styled.div`
  width: 218px;
  height: 338px;
`;

const CImage = styled.img`
  border-radius: 0.25rem;
  width: 218px;
  height: 218px;
`;

const Contents = styled.div`
  text-align: center;
`;

const NftCard = ({ src, name, collectionName }) => {
  return (
    <Container>
      {/* <CImage width="218" height="218" src={src} alt="" /> */}
      <CImage src={src} alt="" />
      <Contents>
        <div>{collectionName}</div>
        <div>{name}</div>
      </Contents>
    </Container>
  );
};

export default NftCard;
