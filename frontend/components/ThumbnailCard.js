import styled from "@emotion/styled";
import Image from "next/image";

const ThumbnailContainer = styled.div`
  width: 144px;
  height: 128px;
  background-color: white;
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

const CImage = styled.img`
  border-radius: 0.25rem;
  width: 100px;
  height: 100px;
`;

const ThumbnailCard = ({ src, children }) => {
  return (
    <ThumbnailContainer>
      {src && (
        <ImageContainer>
          <CImage src={src} alt="" />
        </ImageContainer>
      )}
      <Contents>{children}</Contents>
    </ThumbnailContainer>
  );
};

export default ThumbnailCard;
