import styled from 'styled-components';

export const ProjectBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
`;

export const FloatingCode = styled.div`
  position: absolute;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: #2563eb;
  opacity: 0.3;
  animation: floatCode 15s linear infinite;
  animation-delay: ${props => props.delay || '0s'};
  white-space: nowrap;

  @keyframes floatCode {
    0% {
      transform: translateY(100vh) rotate(0deg);
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
    }
  }
`;