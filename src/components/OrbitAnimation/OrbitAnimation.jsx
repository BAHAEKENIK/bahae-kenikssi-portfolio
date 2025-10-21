import React from 'react';
import styled, { keyframes } from 'styled-components';

const orbit = keyframes`
  0% {
    transform: rotate(0deg) translateX(80px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(80px) rotate(-360deg);
  }
`;

const orbit2 = keyframes`
  0% {
    transform: rotate(120deg) translateX(60px) rotate(-120deg);
  }
  100% {
    transform: rotate(480deg) translateX(60px) rotate(-480deg);
  }
`;

const orbit3 = keyframes`
  0% {
    transform: rotate(240deg) translateX(100px) rotate(-240deg);
  }
  100% {
    transform: rotate(600deg) translateX(100px) rotate(-600deg);
  }
`;

const OrbitContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  z-index: -1;
  
  @media (max-width: 968px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const OrbitRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
`;

const OrbitingDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 50%;
  animation: ${props => props.animation} 6s linear infinite;
  
  &:nth-child(1) {
    animation: ${orbit} 8s linear infinite;
  }
  
  &:nth-child(2) {
    animation: ${orbit2} 6s linear infinite;
    width: 6px;
    height: 6px;
    background: #7c3aed;
  }
  
  &:nth-child(3) {
    animation: ${orbit3} 10s linear infinite;
    width: 10px;
    height: 10px;
    background: #2563eb;
  }
`;

const CentralGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, rgba(37, 99, 235, 0) 70%);
  border-radius: 50%;
  
  @media (max-width: 968px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const OrbitAnimation = () => {
  return (
    <OrbitContainer>
      <OrbitRing />
      <CentralGlow />
      <OrbitingDot />
      <OrbitingDot />
      <OrbitingDot />
    </OrbitContainer>
  );
};

export default OrbitAnimation;