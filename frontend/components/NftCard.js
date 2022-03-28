import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div`
  width: 218px;
  height: 338px;
`;

const CImage = styled(Image)`
  border-radius: 0.25rem;
`;

const Contents = styled.div`
  text-align: center;
`;

const NftCard = ({ src }) => {
  return (
    <Container>
      <CImage width="218" height="218" src={src} alt="" />
      <Contents>nft 소개</Contents>
    </Container>
  );
};

export default NftCard;
