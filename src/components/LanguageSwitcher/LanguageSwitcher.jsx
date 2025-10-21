import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LanguageContainer = styled(motion.div)`
  position: fixed;
  top: 2.5rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(37, 99, 235, 0.3);
  border-radius: 50px;
  padding: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media (max-width: 968px) {
    top: 1.5rem;
    right: 1.5rem;
  }

  @media (max-width: 768px) {
    top: 1.2rem;
    right: 1.2rem;
    padding: 0.4rem;
  }

  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
  }
`;

const LanguageButton = styled(motion.button)`
  background: ${props => props.$isActive ? 
    'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' : 
    'transparent'};
  color: ${props => props.$isActive ? 'white' : '#64748b'};
  border: 1px solid ${props => props.$isActive ? 'transparent' : 'rgba(100, 116, 139, 0.3)'};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.$isActive ? 
      'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' : 
      'rgba(37, 99, 235, 0.1)'};
    color: ${props => props.$isActive ? 'white' : '#2563eb'};
    border-color: ${props => props.$isActive ? 'transparent' : '#2563eb'};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.75rem;
  }
`;

const LanguageIndicator = styled(motion.div)`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.6);
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <LanguageContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {i18n.language === 'fr' && <LanguageIndicator layoutId="languageIndicator" />}
      <LanguageButton
        $isActive={i18n.language === 'fr'}
        onClick={() => changeLanguage('fr')}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        🇫🇷 FR
      </LanguageButton>
      
      {i18n.language === 'en' && <LanguageIndicator layoutId="languageIndicator" />}
      <LanguageButton
        $isActive={i18n.language === 'en'}
        onClick={() => changeLanguage('en')}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        🇬🇧 EN
      </LanguageButton>
    </LanguageContainer>
  );
};

export default LanguageSwitcher;