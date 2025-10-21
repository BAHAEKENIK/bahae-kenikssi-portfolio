import styled from 'styled-components';

export const ScrollProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  transform-origin: left;
  transform: scaleX(0);
  z-index: 9999;
  transition: transform 0.1s ease;
`;

export const PageLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const SectionSpacer = styled.div`
  height: ${props => props.height || '0px'};
  
  @media (max-width: 768px) {
    height: ${props => props.mobileHeight || props.height || '0px'};
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const GlassCard = styled.div`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2563eb;
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(37, 99, 235, 0.2);
  }
`;

export const Button = styled.button`
  background: ${props => props.variant === 'secondary' 
    ? 'transparent' 
    : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'};
  color: ${props => props.variant === 'secondary' ? '#2563eb' : 'white'};
  border: ${props => props.variant === 'secondary' ? '2px solid #2563eb' : 'none'};
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
    
    ${props => props.variant === 'secondary' && `
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      color: white;
      border-color: transparent;
    `}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;