import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import { Button } from '../../styles/GlobalStyles';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 5.5rem 1rem 0;
    text-align: center;
    min-height: 90vh;
  }

  @media (max-width: 480px) {
    padding: 5rem 0.5rem 0;
    min-height: 85vh;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 968px) {
    order: 2;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-top: 0.5rem;
  }
`;

const Greeting = styled(motion.p)`
  font-size: 1.5rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 0.5rem;

  @media (max-width: 968px) {
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }
`;

const Name = styled(motion.h1)`
  font-family: 'Roboto Slab', serif;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 968px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  color: #2563eb;
  font-weight: 600;
  margin-bottom: 1.5rem;

  @media (max-width: 968px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;

  @media (max-width: 968px) {
    max-width: 100%;
    margin: 0 auto 2rem;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
`;

const ImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 968px) {
    order: -1;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
`;

// Orbit animations
const orbitRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const orbitRotateReverse = keyframes`
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
`;

// Main orbit container
const OrbitContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 320px;
  border-radius: 50%;

  @media (max-width: 968px) {
    width: 280px;
    height: 280px;
  }

  @media (max-width: 768px) {
    width: 260px;
    height: 260px;
  }

  @media (max-width: 480px) {
    width: 220px;
    height: 220px;
  }
`;

// Inner orbit - close to the image border
const InnerOrbit = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;
  background: 
    radial-gradient(circle at 30% 30%, #2563eb22, transparent 50%),
    conic-gradient(from 0deg, #2563eb, #7c3aed, #f59e0b, #ef4444, #2563eb);
  background-origin: border-box;
  background-clip: border-box;
  -webkit-mask: 
    linear-gradient(#fff 0 0) padding-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 3px;
  animation: ${orbitRotate} 8s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: conic-gradient(from 180deg, #7c3aed, #f59e0b, #ef4444, #2563eb, #7c3aed);
    animation: ${orbitRotateReverse} 6s linear infinite;
    z-index: -1;
    opacity: 0.7;
  }
`;

// Middle orbit - slightly larger
const MiddleOrbit = styled.div`
  position: absolute;
  width: 110%;
  height: 110%;
  border-radius: 50%;
  border: 1px solid rgba(37, 99, 235, 0.3);
  animation: ${orbitRotateReverse} 12s linear infinite;

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(37, 99, 235, 0.8);
  }
`;

// Outer orbit - decorative
const OuterOrbit = styled.div`
  position: absolute;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  border: 1px solid rgba(124, 58, 237, 0.2);
  animation: ${orbitRotate} 15s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 20%;
    width: 8px;
    height: 8px;
    background: #7c3aed;
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(124, 58, 237, 0.6);
  }
`;

// Floating dots around the orbit
const FloatingDot = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: ${props => props.color || '#2563eb'};
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &:nth-child(1) {
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &:nth-child(2) {
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &:nth-child(3) {
    top: 50%;
    left: -15px;
    transform: translateY(-50%);
  }
  
  &:nth-child(4) {
    top: 50%;
    right: -15px;
    transform: translateY(-50%);
  }

  @media (max-width: 480px) {
    width: 5px;
    height: 5px;
  }
`;

// Profile image wrapper with proper sizing
const ProfileWrapper = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 10;
  border: 3px solid #1e293b;
  box-shadow: 
    0 0 30px rgba(37, 99, 235, 0.3),
    inset 0 0 20px rgba(37, 99, 235, 0.1);

  @media (max-width: 968px) {
    width: 240px;
    height: 240px;
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 180px;
    border: 2px solid #1e293b;
  }
`;

const Hero = () => {
  const { t, i18n } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1
      }
    }
  };

  const cvFileName = i18n.language === 'fr' ? 'bahae_kenikssi_cv_fr.pdf' : 'bahae_kenikssi_cv_en.pdf';

  return (
    <HeroContainer id="home">
      <HeroContent>
        <TextContent
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Greeting variants={itemVariants}>
            {t('hero.greeting')}
          </Greeting>
          
          <Name variants={itemVariants}>
            <AnimatedText text={t('hero.name')} />
          </Name>
          
          <Title variants={itemVariants}>
            {t('hero.title')}
          </Title>
          
          <Description variants={itemVariants}>
            {t('hero.description')}
          </Description>
          
          <ButtonGroup variants={itemVariants}>
            <Button
              as="a"
              href={`/cv/${cvFileName}`}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.downloadCv')}
            </Button>
            <Button
              variant="secondary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.contactMe')}
            </Button>
          </ButtonGroup>
        </TextContent>

        <ImageContainer
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <OrbitContainer>
            <OuterOrbit />
            <MiddleOrbit />
            <InnerOrbit />
            
            {/* Floating dots */}
            <FloatingDot color="#2563eb" delay="0s" />
            <FloatingDot color="#7c3aed" delay="0.5s" />
            <FloatingDot color="#f59e0b" delay="1s" />
            <FloatingDot color="#ef4444" delay="1.5s" />
            
            <ProfileWrapper>
              <ProfileImage />
            </ProfileWrapper>
          </OrbitContainer>
        </ImageContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
