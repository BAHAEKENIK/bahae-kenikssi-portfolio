import styled from 'styled-components';

export const ContactBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  background: 
    radial-gradient(circle at 30% 70%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
`;

export const FloatingMessage = styled.div`
  position: absolute;
  width: 100px;
  height: 60px;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  animation: floatMessage 8s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(37, 99, 235, 0.3);
  }

  @keyframes floatMessage {
    0%, 100% {
      transform: translateY(0) rotate(-5deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  &:nth-child(1) {
    top: 20%;
    left: 10%;
  }

  &:nth-child(2) {
    bottom: 30%;
    right: 15%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    top: 40%;
    right: 5%;
    animation-delay: 4s;
  }
`;