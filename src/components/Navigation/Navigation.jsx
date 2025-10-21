import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  z-index: 100;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid transparent;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%) padding-box,
              linear-gradient(135deg, #2563eb 0%, #7c3aed 100%) border-box;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const LogoText = styled.div`
  font-family: 'Roboto Slab', serif;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const NavLinks = styled(motion.ul)`
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const NavLink = styled(motion.li)`
  position: relative;
`;

const Link = styled.a`
  color: ${props => props.active ? '#2563eb' : '#cbd5e1'};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CVDownloadButton = styled(motion.a)`
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    width: 100%;
    text-align: center;
  }
`;

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'about', label: t('nav.about') },
    { key: 'experience', label: t('nav.experience') },
    { key: 'projects', label: t('nav.projects') },
    { key: 'skills', label: t('nav.skills') },
    { key: 'certificates', label: t('nav.certificates') },
    { key: 'contact', label: t('nav.contact') }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.key));
      const scrollPosition = window.scrollY + 100;

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

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const linkVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  const cvFileName = i18n.language === 'fr' ? 'bahae_kenikssi_cv_fr.pdf' : 'bahae_kenikssi_cv_en.pdf';

  return (
    <Nav
      variants={navVariants}
      initial="initial"
      animate="animate"
    >
      <NavContainer>
        <LogoContainer
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection('home')}
        >
          
          <LogoText>Bahae Kenikssi</LogoText>
        </LogoContainer>

        <NavLinks isOpen={isMobileMenuOpen}>
          {navItems.map((item) => (
            <NavLink key={item.key} variants={linkVariants}>
              <Link
                active={activeSection === item.key}
                onClick={() => scrollToSection(item.key)}
              >
                {item.label}
              </Link>
            </NavLink>
          ))}
          <CVDownloadButton
            href={`/cv/${cvFileName}`}
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.downloadCv')}
          </CVDownloadButton>
        </NavLinks>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;