import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLazyLoad } from '../../hooks/useLazyLoad';

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: #1e293b;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transition: opacity 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 0.9rem;
`;

const ProfileImage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, isIntersecting] = useLazyLoad();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMjU2M2ViIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+Qks8L3RleHQ+Cjwvc3ZnPgo=';
    setImageLoaded(true);
  };

  return (
    <ProfileContainer ref={ref}>
      <ImageWrapper
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {!imageLoaded && (
          <LoadingPlaceholder>
            Loading...
          </LoadingPlaceholder>
        )}
        {isIntersecting && (
          <ProfileImg 
            src="/src/assets/images/profile/profile.jpg" 
            alt="Bahae Kenikssi"
            onLoad={handleImageLoad}
            onError={handleImageError}
            $isLoaded={imageLoaded}
            loading="lazy"
          />
        )}
      </ImageWrapper>
    </ProfileContainer>
  );
};

export default ProfileImage;