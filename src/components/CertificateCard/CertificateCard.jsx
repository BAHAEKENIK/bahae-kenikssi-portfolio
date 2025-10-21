import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiExternalLink, FiCalendar, FiClock, FiAward } from 'react-icons/fi';

const Card = styled(motion.div)`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;

  &:hover {
    border-color: #2563eb;
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2);

    .certificate-image {
      transform: scale(1.1);
    }

    .view-certificate {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const CertificateImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
`;

const ViewButton = styled(motion.button)`
  background: rgba(15, 23, 42, 0.9);
  border: 2px solid white;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transform: translateY(20px);
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #2563eb;
  }
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const CertificateHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const IssuerIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  flex: 1;
  margin-right: 1rem;
`;

const Issuer = styled.p`
  color: #2563eb;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;

  svg {
    color: #2563eb;
  }
`;

const Description = styled.p`
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SkillTag = styled.span`
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.3);
  color: #2563eb;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' : 
    'transparent'};
  color: ${props => props.primary ? 'white' : '#2563eb'};
  border: ${props => props.primary ? 'none' : '1px solid #2563eb'};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
  }
`;

const CertificateCard = ({ certificate, index, onViewCertificate }) => {
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUUyOTNCIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzI1NjNFQiIgb3BhY2l0eT0iMC4zIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NDc0OEIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNlcnRpZmljYXRlIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    }
    return `/src/assets/images/certificates/${certificate.image}`;
  };

  return (
    <Card
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
    >
      <ImageContainer>
        <CertificateImage
          src={getImageSrc()}
          alt={certificate.title}
          className="certificate-image"
          onError={handleImageError}
        />
        <ImageOverlay className="view-certificate">
          <ViewButton
            onClick={() => onViewCertificate(certificate)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiExternalLink />
            View Certificate
          </ViewButton>
        </ImageOverlay>
      </ImageContainer>

      <CardContent>
        <CertificateHeader>
          <Title>{certificate.title}</Title>
          <IssuerIcon>
            <FiAward />
          </IssuerIcon>
        </CertificateHeader>

        <Issuer>
          <FiAward size={16} />
          {certificate.issuer}
        </Issuer>

        <MetaInfo>
          <MetaItem>
            <FiCalendar />
            {certificate.date}
          </MetaItem>
          {certificate.duration && (
            <MetaItem>
              <FiClock />
              {certificate.duration}
            </MetaItem>
          )}
        </MetaInfo>

        <Description>{certificate.description}</Description>

        {certificate.skills && certificate.skills.length > 0 && (
          <Skills>
            {certificate.skills.slice(0, 4).map((skill, skillIndex) => (
              <SkillTag key={skillIndex}>{skill}</SkillTag>
            ))}
            {certificate.skills.length > 4 && (
              <SkillTag>+{certificate.skills.length - 4}</SkillTag>
            )}
          </Skills>
        )}

        <Actions>
          <ActionButton
            primary
            onClick={() => onViewCertificate(certificate)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiExternalLink />
            View
          </ActionButton>
          {certificate.credentialUrl && certificate.credentialUrl !== '#' && (
            <ActionButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              as="a"
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify
            </ActionButton>
          )}
        </Actions>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;