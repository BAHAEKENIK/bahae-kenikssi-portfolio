import styled from 'styled-components';

export const FooterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.02;
  pointer-events: none;
  z-index: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
`;

export const FloatingElement = styled.div`
  position: absolute;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  background: ${props => props.background || 'rgba(37, 99, 235, 0.1)'};
  border: 1px solid rgba(37, 99, 235, 0.3);
  border-radius: ${props => props.circle ? '50%' : '8px'};
  animation: floatElement 10s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  z-index: 0;

  @keyframes floatElement {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    33% {
      transform: translateY(-15px) rotate(120deg);
    }
    66% {
      transform: translateY(5px) rotate(240deg);
    }
  }

  &:nth-child(1) {
    bottom: 20%;
    left: 10%;
  }

  &:nth-child(2) {
    bottom: 40%;
    right: 15%;
    animation-delay: 3s;
  }

  &:nth-child(3) {
    bottom: 60%;
    left: 20%;
    animation-delay: 6s;
  }
`;

export const WaveDivider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: translateY(-1px);

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 50px;
  }

  .shape-fill {
    fill: rgba(15, 23, 42, 0.95);
  }
`;