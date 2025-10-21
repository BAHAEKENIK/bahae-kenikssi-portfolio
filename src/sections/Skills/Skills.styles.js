import styled from 'styled-components';

export const SkillBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  pointer-events: none;
  z-index: 0;
  background: 
    radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
`;

export const FloatingCode = styled.div`
  position: absolute;
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: rgba(37, 99, 235, 0.3);
  animation: floatCode 20s linear infinite;
  animation-delay: ${props => props.delay || '0s'};
  white-space: nowrap;
  pointer-events: none;

  @keyframes floatCode {
    0% {
      transform: translateX(-100px) translateY(100vh) rotate(0deg);
    }
    100% {
      transform: translateX(100vw) translateY(-100px) rotate(360deg);
    }
  }
`;