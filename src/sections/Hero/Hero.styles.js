import styled from 'styled-components';

export const FloatingElement = styled.div`
  position: absolute;
  width: ${props => props.size || '20px'};
  height: ${props => props.size || '20px'};
  background: ${props => props.background || 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'};
  border-radius: ${props => props.circle ? '50%' : '4px'};
  animation: float 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0.7;

  &:nth-child(1) {
    top: 20%;
    left: 10%;
  }

  &:nth-child(2) {
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
`;

export const GradientUnderline = styled.span`
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;