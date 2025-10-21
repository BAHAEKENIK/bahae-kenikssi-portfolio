import styled from 'styled-components';

export const FloatingShape = styled.div`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  background: ${props => props.background || 'rgba(37, 99, 235, 0.1)'};
  border: 2px solid rgba(37, 99, 235, 0.3);
  border-radius: ${props => {
    switch (props.shape) {
      case 'circle': return '50%';
      case 'triangle': return '0%';
      default: return '16px';
    }
  }};
  animation: float 8s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  z-index: 0;

  &:nth-child(1) {
    top: 10%;
    left: 5%;
  }

  &:nth-child(2) {
    bottom: 20%;
    right: 8%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    top: 40%;
    right: 15%;
    animation-delay: 4s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    33% {
      transform: translateY(-20px) rotate(120deg);
    }
    66% {
      transform: translateY(10px) rotate(240deg);
    }
  }
`;

export const GradientBorder = styled.div`
  position: relative;
  padding: 2px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  
  &::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: #1e293b;
    border-radius: 14px;
    z-index: 1;
  }
  
  > * {
    position: relative;
    z-index: 2;
  }
`;