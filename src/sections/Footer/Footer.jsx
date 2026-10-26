import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiArrowUp, FiMapPin } from 'react-icons/fi';

/* =========================================
   CUSTOM CURSOR COMPONENT
   ========================================= */
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkPointer = window.matchMedia('(pointer: fine)');
    setIsMobile(!checkPointer.matches);
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        style={{
          position: 'fixed', left: 0, top: 0, x: cursorXSpring, y: cursorYSpring,
          translateX: '-50%', translateY: '-50%', width: '36px', height: '36px',
          border: '1px solid rgba(217, 109, 66, 0.6)', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9998, boxShadow: '0 0 15px rgba(217, 109, 66, 0.2)',
        }}
      />
      <motion.div
        style={{
          position: 'fixed', left: 0, top: 0, x: cursorX, y: cursorY,
          translateX: '-50%', translateY: '-50%', width: '6px', height: '6px',
          backgroundColor: '#D96D42', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999,
        }}
      />
    </>
  );
};

/* =========================================
   STYLED COMPONENTS
   ========================================= */
const FooterContainer = styled.footer`
  position: relative;
  isolation: isolate;
  background: #0C0B0A;
  border-top: 1px solid #49372D;
  padding: 5rem 2rem 2rem;
  color: #F0E8DE;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  cursor: default;

  @media (max-width: 768px) {
    padding: 4rem 1rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 1;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  width: 100%;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }
`;

/* --- BRAND SECTION --- */
const BrandSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 968px) {
    align-items: center;
  }
`;

const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #F0E8DE;
  letter-spacing: -1px;

  span {
    color: #D96D42;
  }
`;

const Tagline = styled.p`
  color: #C8C0B7;
  font-size: 0.9rem;
  line-height: 1.6;
  max-width: 320px;
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 42px;
  height: 42px;
  background: rgba(18, 17, 16, 0.6);
  border: 1px solid #49372D;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C8C0B7;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #D96D42;
    border-color: #D96D42;
    color: #FFF;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(217, 109, 66, 0.3);
  }
`;

/* --- LINKS SECTION --- */
const LinksSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 968px) {
    align-items: center;
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #F0E8DE;
  margin: 0 0 0.5rem 0;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 968px) {
    align-items: center;
  }
`;

const FooterLink = styled(motion.a)`
  color: #92877D;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    color: #F18A5B;
    transform: translateX(5px);

    @media (max-width: 968px) {
      transform: translateY(-2px);
    }
  }
`;

/* --- CONTACT SECTION --- */
const ContactSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 968px) {
    align-items: center;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #92877D;
  font-size: 0.85rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #F18A5B;
  }

  svg {
    color: #D96D42;
    font-size: 1rem;
  }
`;

/* --- BOTTOM SECTION --- */
const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  border-top: 1px solid rgba(73, 55, 45, 0.5);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: #92877D;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MadeWith = styled.div`
  color: #92877D;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const ScrollToTop = styled(motion.button)`
  background: linear-gradient(145deg, #E77C50, #AD482B);
  border: 1px solid #D96D42;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    background: #F18A5B;
    border-color: #F18A5B;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(217, 109, 66, 0.3);
  }
`;

/* =========================================
   MAIN COMPONENT
   ========================================= */
const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('nav.home') || 'Accueil', href: '#home' },
    { name: t('nav.about') || 'À Propos', href: '#about' },
    { name: t('nav.projects') || 'Projets', href: '#projects' },
    { name: t('nav.experience') || 'Expérience', href: '#experience' },
    { name: t('nav.contact') || 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/BAHAEKENIK', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/bahae-kenikssi-40414021b/', label: 'LinkedIn' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <FooterContainer>
      <CustomCursor />
      
      <Container>
        <FooterContent
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* BRAND */}
          <BrandSection variants={fadeUp}>
            <Logo>
              Bahae <span>Kenikssi</span>
            </Logo>
            <Tagline>
              {t('footer.tagline') || "Développeur Full Stack passionné par la création d'expériences web exceptionnelles."}
            </Tagline>
            <SocialLinks>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </SocialLinks>
          </BrandSection>

          {/* QUICK LINKS */}
          <LinksSection variants={fadeUp}>
            <SectionTitle>{t('footer.quickLinks') || 'Liens Rapides'}</SectionTitle>
            <FooterLinks>
              {quickLinks.map((link, index) => (
                <FooterLink
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                >
                  {link.name}
                </FooterLink>
              ))}
            </FooterLinks>
          </LinksSection>

          {/* CONTACT */}
          <ContactSection variants={fadeUp}>
            <SectionTitle>{t('footer.getInTouch') || 'Restons en Contact'}</SectionTitle>
            <ContactInfo>
              <ContactItem href="mailto:bahaekenik@gmail.com">
                <FiMail />
                bahaekenik@gmail.com
              </ContactItem>
              <ContactItem href="https://maps.google.com/?q=Rabat,Morocco" target="_blank" rel="noopener noreferrer">
                <FiMapPin />
                {t('footer.location') || 'Rabat, Maroc'}
              </ContactItem>
            </ContactInfo>
          </ContactSection>
        </FooterContent>

        {/* BOTTOM BAR */}
        <BottomSection>
          <Copyright>
            {t('footer.copyright', { year: currentYear }) || `© ${currentYear} Bahae Kenikssi. Tous droits réservés.`}
          </Copyright>

          <MadeWith>
            {t('footer.madeWith') || 'Fait avec'}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FiHeart color="#D96D42" fill="#D96D42" size={14} />
            </motion.div>
          </MadeWith>

          <ScrollToTop
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={t('footer.scrollToTop') || 'Retour en haut'}
          >
            <FiArrowUp />
          </ScrollToTop>
        </BottomSection>
      </Container>
    </FooterContainer>
  );
};

export default Footer;