import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${props => props.isExiting ? fadeOut : 'none'} 0.5s ease forwards;
`;

const LogoContainer = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
`;

const Name = styled(motion.h1)`
  font-family: 'Roboto Slab', serif;
  font-size: 3rem;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Title = styled(motion.p)`
  font-size: 1.2rem;
  color: #cbd5e1;
  margin-bottom: 2rem;
`;

const Loader = styled(motion.div)`
  width: 80px;
  height: 80px;
  position: relative;
`;

const Circle = styled(motion.div)`
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  position: absolute;
`;

const ProgressText = styled(motion.p)`
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const nameVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const titleVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.5, duration: 0.8 } }
  };

  const circleVariants = {
    animate: {
      rotate: 360,
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 1.5,
          ease: "linear"
        }
      }
    }
  };

  return (
    <LoadingContainer
      variants={containerVariants}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      isExiting={isExiting}
    >
      <LogoContainer>
        <Name
          variants={nameVariants}
          initial="initial"
          animate="animate"
        >
          Bahae Kenikssi
        </Name>
        <Title
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          Full Stack Developer
        </Title>
      </LogoContainer>

      <Loader>
        <Circle variants={circleVariants} animate="animate" />
        <Circle 
          variants={circleVariants} 
          animate="animate" 
          style={{ borderTopColor: '#7c3aed', rotate: 180 }} 
        />
      </Loader>

      <ProgressText>
        Loading... {progress}%
      </ProgressText>
    </LoadingContainer>
  );
};

export default LoadingScreen;