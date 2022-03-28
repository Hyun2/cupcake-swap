import styled from "@emotion/styled";
import Image from "next/image";

const ThumbnailContainer = styled.div`
  width: 144px;
  height: 128px;
  background-color: #f0eee8;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  border-radius: 0.25rem !important;
  display: flex;
  justify-content: center;
  height: 100px;
  padding: 8px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThumbnailCard = ({ src }) => {
  return (
    <ThumbnailContainer>
      {src && (
        <ImageContainer>
          <Image width="128" height="128" src={src} alt="" />
        </ImageContainer>
      )}
      <Contents>테스트</Contents>
    </ThumbnailContainer>
  );
};

export default ThumbnailCard;
