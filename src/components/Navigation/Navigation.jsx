import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 2rem;
  z-index: 100;
  background: rgba(17, 18, 19, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(241, 233, 225, 0.09);
  font-family: 'Manrope', sans-serif;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1370px;
  margin: 0 auto;
  min-height: 89px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    min-height: 75px;
  }
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  white-space: nowrap;
`;

const LogoMark = styled.span`
  color: #e97852;
  font-family: 'Caveat', cursive;
  font-size: 42px;
  line-height: 1;
  transform: rotate(-7deg);
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const LogoText = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #f1e9e1;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const NavLinks = styled(motion.ul)`
  display: flex;
  list-style: none;
  gap: clamp(16px, 2vw, 36px);
  align-items: center;

  @media (max-width: 968px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(17, 18, 19, 0.98);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    border-bottom: 1px solid rgba(241, 233, 225, 0.09);
  }
`;

const NavLink = styled(motion.li)`
  position: relative;
`;

const Link = styled.a`
  color: ${props => props.active ? '#e97852' : '#d4cec8'};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 0;
  transition: color 0.2s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #e97852;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: #e97852;
    transition: width 0.2s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const CVDownloadButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 17px;
  border: 1px solid rgba(233, 120, 82, 0.8);
  border-radius: 999px;
  color: #f1e9e1;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(233, 120, 82, 0.12);
    border-color: #e97852;
  }

  @media (max-width: 968px) {
    width: 100%;
    justify-content: center;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #d4cec8;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 968px) {
    display: block;
  }
`;

const Navigation = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t('nav.home') || 'Accueil' },
    { key: 'about', label: t('nav.about') || 'À Propos' },
    { key: 'experience', label: t('nav.experience') || 'Expérience' },
    { key: 'projects', label: t('nav.projects') || 'Projets' },
    { key: 'skills', label: t('nav.skills') || 'Compétences' },
    { key: 'certificates', label: t('nav.certificates') || 'Certificats' },
    { key: 'contact', label: t('nav.contact') || 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.key));
      const scrollPosition = window.scrollY + 150;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Updated to use the single PDF file name
  const cvFileName = 'bahae_kenikssi.pdf';

  return (
    <Nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
      <NavContainer>
        <LogoContainer onClick={() => scrollToSection('home')}>
          <LogoMark>BK</LogoMark>
          <LogoText>Bahae Kenikssi</LogoText>
        </LogoContainer>

        <NavLinks isOpen={isMobileMenuOpen}>
          {navItems.map((item) => (
            <NavLink key={item.key}>
              <Link
                active={activeSection === item.key ? 1 : 0}
                onClick={() => scrollToSection(item.key)}
              >
                {item.label}
              </Link>
            </NavLink>
          ))}
          <CVDownloadButton href={`/cv/${cvFileName}`} download>
            <span aria-hidden="true">↓</span> {t('hero.downloadCv') || 'Télécharger CV'}
          </CVDownloadButton>
        </NavLinks>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;