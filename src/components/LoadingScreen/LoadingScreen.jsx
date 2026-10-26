import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

/* =========================================
   ORBIT ANIMATION (Fixed Transient Props)
   ========================================= */
const colors = {
  orange: '#D96D42',
  green: '#34d399',
  amber: '#F18A5B',
};

const orbitCW = keyframes`
  0%   { transform: rotate(0deg)   translateX(80px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`;
const orbitCCW = keyframes`
  0%   { transform: rotate(0deg)    translateX(55px) rotate(0deg); }
  100% { transform: rotate(-360deg) translateX(55px) rotate(360deg); }
`;
const orbitTilted = keyframes`
  0%   { transform: rotate(30deg)  translateX(90px) rotate(-30deg); }
  100% { transform: rotate(390deg) translateX(90px) rotate(-390deg); }
`;
const pulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.65; }
  50%      { transform: translate(-50%, -50%) scale(1.18); opacity: 1; }
`;
const spin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
`;

const OrbitContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  @media (max-width: 768px) { width: 240px; height: 240px; }
`;

const OrbitRing = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  width: 100%; height: 100%;
  border-radius: 50%;
  border: 1px dashed ${(p) => p.$color || 'rgba(217, 109, 66, 0.4)'};
  transform: translate(-50%, -50%) rotate(${(p) => p.$tilt || 0}deg) scaleY(${(p) => p.$squash || 1});
`;

const ArcRing = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  width: 88%; height: 88%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0deg 200deg, ${colors.orange} 260deg, ${colors.green} 300deg, transparent 360deg);
  -webkit-mask: radial-gradient(circle, transparent 62%, #000 63%);
  mask: radial-gradient(circle, transparent 62%, #000 63%);
  animation: ${spin} 10s linear infinite;
  opacity: 0.6;
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
  width: 120px; height: 120px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%);
  animation: ${pulse} 3s ease-in-out infinite;
`;

const OrbitAnimation = () => (
  <OrbitContainer>
    {/* Notice the $ before every custom prop */}
    <OrbitRing $tilt={-15} />
    <OrbitRing $tilt={55} $squash={0.6} />
    <ArcRing />
    <CentralGlow />
    <OrbitingDot $animation={orbitCW} $duration="4s" $color={colors.orange} $size={8} />
    <OrbitingDot $animation={orbitCCW} $duration="3s" $color={colors.green} $size={6} />
    <OrbitingDot $animation={orbitTilted} $duration="5s" $color={colors.amber} $size={7} />
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
`;

const TypographyWrapper = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const Name = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #F0E8DE;
  margin: 0 0 0.5rem 0;
  letter-spacing: -1px;
  min-height: 3.5rem; 
  span { color: #D96D42; }
`;

const Subtitle = styled.p`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  color: #92877D;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0 0 2rem 0;
`;

const ProgressContainer = styled.div`
  width: 250px;
  height: 2px;
  background: #292725;
  border-radius: 99px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
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
  width: 250px;
  margin: 1rem auto 0;
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

  const renderTypedName = () => {
    if (typedName.length <= 6) {
      return <span style={{ color: '#F0E8DE' }}>{typedName}</span>;
    }
    return (
      <>
        <span style={{ color: '#F0E8DE' }}>{typedName.substring(0, 6)}</span>
        <span>{typedName.substring(6)}</span>
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
        initial={{ opacity: 0, scale: 0.8 }}
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
            style={{ display: 'inline-block', marginLeft: '4px' }}
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