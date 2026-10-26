import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

/* =========================================
   SIMPLIFIED ORBIT ANIMATION
   ========================================= */
const colors = {
  orange: '#D96D42',
  green: '#34d399',
};

const orbitCW = keyframes`
  0%   { transform: rotate(0deg)   translateX(80px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`;

const orbitCCW = keyframes`
  0%   { transform: rotate(0deg)    translateX(60px) rotate(0deg); }
  100% { transform: rotate(-360deg) translateX(60px) rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.5; }
  50%      { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
`;

const OrbitContainer = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
  @media (max-width: 480px) {
    width: 180px;
    height: 180px;
    margin-bottom: 1rem;
  }
`;

const OrbitRing = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  width: 100%; height: 100%;
  border-radius: 50%;
  border: 1px dashed rgba(217, 109, 66, 0.3);
  transform: translate(-50%, -50%);
`;

const OrbitingDot = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  background: ${(p) => p.$color};
  border-radius: 50%;
  box-shadow: 0 0 12px ${(p) => p.$color};
  animation: ${(p) => p.$animation} ${(p) => p.$duration} linear infinite;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 200%; height: 200%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, ${(p) => p.$color}55 0%, transparent 70%);
    filter: blur(3px);
  }
`;

const CentralGlow = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  width: 100px; height: 100px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(217, 109, 66, 0.15) 0%, transparent 70%);
  animation: ${pulse} 3s ease-in-out infinite;
`;

const OrbitAnimation = () => (
  <OrbitContainer>
    <OrbitRing />
    <CentralGlow />
    <OrbitingDot $animation={orbitCW} $duration="5s" $color={colors.orange} $size={8} />
    <OrbitingDot $animation={orbitCCW} $duration="4s" $color={colors.green} $size={6} />
  </OrbitContainer>
);

/* =========================================
   MAIN LOADING SCREEN
   ========================================= */
const LoadingContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #0C0B0A;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-family: 'Poppins', sans-serif;
  padding: 1rem;
`;

const TypographyWrapper = styled.div`
  text-align: center;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Name = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 6vw, 2.5rem);
  margin: 0 0 0.5rem 0;
  letter-spacing: -1px;
  min-height: 3.5rem; 
  white-space: nowrap;
`;

const Subtitle = styled.p`
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  color: #92877D;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0 0 2rem 0;
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 250px;
  height: 2px;
  background: #292725;
  border-radius: 99px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #AD482B, #D96D42, #F18A5B);
  box-shadow: 0 0 10px rgba(217, 109, 66, 0.5);
`;

const ProgressText = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  color: #D96D42;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 250px;
`;

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [typedName, setTypedName] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  const fullName = "Bahae Kenikssi";

  // Typing Effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedName(fullName.substring(0, i + 1));
      i++;
      if (i === fullName.length) clearInterval(typingInterval);
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  // Progress Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(() => onLoadingComplete(), 800); 
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 2;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  // Ensure "Bahae" is White/Ivory and "Kenikssi" is Copper Orange
  const renderTypedName = () => {
    // "Bahae " is 6 characters long
    if (typedName.length <= 6) {
      return <span style={{ color: '#F0E8DE' }}>{typedName}</span>;
    }
    return (
      <>
        <span style={{ color: '#F0E8DE' }}>{typedName.substring(0, 6)}</span>
        <span style={{ color: '#D96D42' }}>{typedName.substring(6)}</span>
      </>
    );
  };

  const containerVariants = {
    initial: { opacity: 1, filter: 'blur(0px)', scale: 1 },
    exit: { opacity: 0, filter: 'blur(10px)', scale: 1.05, transition: { duration: 0.8 } }
  };

  return (
    <LoadingContainer
      variants={containerVariants}
      initial="initial"
      animate={isExiting ? 'exit' : 'initial'}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <OrbitAnimation />
      </motion.div>

      <TypographyWrapper>
        <Name>
          {renderTypedName()}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ display: 'inline-block', marginLeft: '4px', color: '#D96D42' }}
          >
            |
          </motion.span>
        </Name>
        <Subtitle>Développeur Full Stack</Subtitle>
        
        <ProgressContainer>
          <ProgressFill style={{ width: `${Math.min(progress, 100)}%` }} />
        </ProgressContainer>
        
        <ProgressText>
          <span>Initialisation...</span>
          <span>{Math.min(progress, 100)}%</span>
        </ProgressText>
      </TypographyWrapper>
    </LoadingContainer>
  );
};

export default LoadingScreen;