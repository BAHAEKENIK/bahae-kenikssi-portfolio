import styled from 'styled-components';

export const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  pointer-events: none;
  z-index: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
`;

export const FloatingIcon = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: rgba(37, 99, 235, 0.3);
  animation: floatIcon 10s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  z-index: 0;

  @keyframes floatIcon {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    33% {
      transform: translateY(-30px) rotate(120deg);
    }
    66% {
      transform: translateY(15px) rotate(240deg);
    }
  }

  &:nth-child(1) {
    top: 15%;
    left: 10%;
  }

  &:nth-child(2) {
    bottom: 25%;
    right: 12%;
    animation-delay: 3s;
  }

  &:nth-child(3) {
    top: 35%;
    right: 20%;
    animation-delay: 6s;
  }
`;