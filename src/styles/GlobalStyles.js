import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Raleway', sans-serif;
    background: #0f172a;
    color: #f8fafc;
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto Slab', serif;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3.5rem;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      border-radius: 2px;
    }

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    color: #2563eb;
  }

  p {
    margin-bottom: 1rem;
    color: #cbd5e1;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  button {
    font-family: 'Raleway', sans-serif;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  section {
    padding: 5rem 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 768px) {
      padding: 3rem 1rem;
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1e293b;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%);
  }

  /* Selection Styling */
  ::selection {
    background: #2563eb;
    color: white;
  }
`;

export const SectionWrapper = styled.section`
  position: relative;
  background: ${props => props.background || 'transparent'};
`;

export const Button = styled.button`
  background: ${props => props.variant === 'secondary' ? 'transparent' : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'};
  color: ${props => props.variant === 'secondary' ? '#2563eb' : 'white'};
  border: ${props => props.variant === 'secondary' ? '2px solid #2563eb' : 'none'};
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
    background: ${props => props.variant === 'secondary' ? 
      'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' : 
      'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)'};
    color: white;
    border-color: transparent;
  }

  &:active {
    transform: translateY(-1px);
  }
`;