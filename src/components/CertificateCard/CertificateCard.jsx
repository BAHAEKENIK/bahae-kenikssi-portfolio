import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiExternalLink, FiCalendar, FiClock, FiAward } from 'react-icons/fi';

/* =========================================
   TYPING EFFECT COMPONENT
   ========================================= */
const TypingEffect = ({ text, delay = 0, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeout;
    let interval;
    let i = 0;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <span style={{ visibility: 'hidden', pointerEvents: 'none' }}>{text}</span>
      <span style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'pre-wrap' }}>
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          style={{
            display: 'inline-block',
            width: '3px',
            height: '1.1em',
            backgroundColor: '#D96D42',
            marginLeft: '4px',
            verticalAlign: 'text-bottom',
          }}
        />
      </span>
    </span>
  );
};

/* =========================================
   STYLED COMPONENTS
   ========================================= */
const Card = styled(motion.div)`
  background: rgba(18, 17, 16, 0.92);
  border: 1px solid #49372D;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  &:hover {
    border-color: #D96D42;
    transform: translateY(-5px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3), 0 0 20px rgba(217, 109, 66, 0.1);

    .certificate-image {
      transform: scale(1.05);
    }

    .view-overlay {
      opacity: 1;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 1; /* Better for landscape certificates */
  overflow: hidden;
  background: #1B1917;
  border-bottom: 1px solid #292725;

  @media (max-width: 768px) {
    aspect-ratio: 2.2 / 1; /* Adjust slightly for mobile */
  }
`;

const CertificateImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(12, 11, 10, 0.75);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  /* Disable overlay on touch devices */
  @media (hover: none) {
    display: none;
  }
`;

const ViewButton = styled(motion.button)`
  background: #D96D42;
  border: none;
  color: #FFF;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  transition: background 0.3s ease;

  &:hover {
    background: #F18A5B;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 480px) {
    padding: 1.2rem;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const Title = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #F0E8DE;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  min-height: 3.2rem; /* Prevents layout jump while typing */

  @media (max-width: 480px) {
    font-size: 1.05rem;
    min-height: 2.8rem;
  }
`;

const IconTile = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(145deg, #E77C50, #AD482B);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  font-size: 1.2rem;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

const Issuer = styled.div`
  color: #D96D42;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 0.8rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #92877D;
  font-size: 0.75rem;

  svg {
    color: #D96D42;
  }
`;

const Description = styled.p`
  color: #C8C0B7;
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 0.8rem;
  }
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.2rem;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const SkillTag = styled.span`
  background: transparent;
  border: 1px solid #74412E;
  color: #E6B39A;
  padding: 0.2rem 0.6rem;
  border-radius: 15px;
  font-size: 0.7rem;

  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 0.15rem 0.5rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.8rem;
  border-top: 1px solid #49372D;
  padding-top: 1rem;
  margin-top: auto;
  flex-wrap: wrap; /* Allows buttons to stack if needed on tiny screens */
`;

const ActionButton = styled(motion.button)`
  background: ${props => (props.primary ? '#D96D42' : 'transparent')};
  color: ${props => (props.primary ? '#FFF' : '#D96D42')};
  border: 1px solid ${props => (props.primary ? '#D96D42' : '#74412E')};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex: 1;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => (props.primary ? '#F18A5B' : 'rgba(217, 109, 66, 0.1)')};
    border-color: #F18A5B;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
`;

/* =========================================
   MAIN COMPONENT
   ========================================= */
const CertificateCard = ({ certificate, index, onViewCertificate }) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  };

  const getImageSrc = () => {
    if (imageError) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTExMDBGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Mjg3N0QiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNlcnRpZmljYXQgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
    }
    return `/assets/images/certificates/${certificate.image}`;
  };

  return (
    <Card variants={cardVariants}>
      <ImageContainer>
        <CertificateImage
          src={getImageSrc()}
          alt={certificate.title}
          className="certificate-image"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <ImageOverlay className="view-overlay">
          <ViewButton
            onClick={() => onViewCertificate(certificate)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiExternalLink />
            {t('certificates.card.viewCertificate') || 'Voir le Certificat'}
          </ViewButton>
        </ImageOverlay>
      </ImageContainer>

      <CardContent>
        <TopRow>
          <Title>
            <TypingEffect text={certificate.title} delay={index * 200} />
          </Title>
          <IconTile>
            <FiAward />
          </IconTile>
        </TopRow>

        <Issuer>
          <FiAward size={14} />
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
            {certificate.skills.slice(0, 4).map((skill, i) => (
              <SkillTag key={i}>{skill}</SkillTag>
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiExternalLink />
            {t('certificates.card.view') || 'Voir'}
          </ActionButton>
          {certificate.credentialUrl && certificate.credentialUrl !== '#' && (
            <ActionButton
              as={motion.a}
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('certificates.card.verify') || 'Vérifier'}
            </ActionButton>
          )}
        </Actions>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;