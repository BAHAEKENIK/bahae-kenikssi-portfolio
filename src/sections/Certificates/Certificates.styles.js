import styled from 'styled-components';

export const CertificateBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  background: 
    radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
`;

export const FloatingBadge = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background: ${props => props.background || 'rgba(37, 99, 235, 0.1)'};
  border: 2px solid rgba(37, 99, 235, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  animation: floatBadge 15s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  z-index: 0;

  @keyframes floatBadge {
    0%, 100% {
      transform: translateY(0) rotate(0deg) scale(1);
    }
    25% {
      transform: translateY(-20px) rotate(90deg) scale(1.1);
    }
    50% {
      transform: translateY(0) rotate(180deg) scale(1);
    }
    75% {
      transform: translateY(20px) rotate(270deg) scale(0.9);
    }
  }

  &:nth-child(1) {
    top: 15%;
    left: 10%;
  }

  &:nth-child(2) {
    bottom: 20%;
    right: 15%;
    animation-delay: 5s;
  }

  &:nth-child(3) {
    top: 40%;
    right: 8%;
    animation-delay: 10s;
  }
`;