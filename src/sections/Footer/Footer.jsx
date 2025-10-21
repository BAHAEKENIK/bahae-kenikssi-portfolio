import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiArrowUp, FiMapPin } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 2rem 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 1rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  width: 100%;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const BrandSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.div`
  font-family: 'Roboto Slab', serif;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Tagline = styled.p`
  color: #cbd5e1;
  line-height: 1.6;
  max-width: 400px;
  margin-bottom: 1rem;

  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 45px;
  height: 45px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
    transform: translateY(-3px);
  }
`;

const LinksSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(motion.a)`
  color: #64748b;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #2563eb;
    transform: translateX(5px);
  }
`;

const ContactSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;

  svg {
    color: #2563eb;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MadeWith = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ScrollToTop = styled(motion.button)`
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  }
`;

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  const socialLinks = [
    {
      icon: <FiGithub />,
      url: 'https://github.com/BAHAEKENIK',
      label: 'GitHub'
    },
    {
      icon: <FiLinkedin />,
      url: 'https://www.linkedin.com/in/bahae-kenikssi-40414021b/',
      label: 'LinkedIn'
    },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <FooterContainer>
      <Container>
        <FooterContent
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <BrandSection variants={itemVariants}>
            <Logo>Bahae Kenikssi</Logo>
            <Tagline>
              Full Stack Developer passionate about creating amazing web experiences. 
              Always learning, always building, always pushing boundaries.
            </Tagline>
            <SocialLinks>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </SocialLinks>
          </BrandSection>

          <LinksSection variants={itemVariants}>
            <SectionTitle>Quick Links</SectionTitle>
            <FooterLinks>
              {quickLinks.map((link, index) => (
                <FooterLink
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </FooterLink>
              ))}
            </FooterLinks>
          </LinksSection>

          <ContactSection variants={itemVariants}>
            <SectionTitle>Get In Touch</SectionTitle>
            <ContactInfo>
              <ContactItem>
                <FiMail />
                bahaekenik@email.com
              </ContactItem>
              <ContactItem>
                <FiMapPin />
                Ouezzane, Morocco
              </ContactItem>
            </ContactInfo>
          </ContactSection>
        </FooterContent>

        <BottomSection>
          <Copyright>
           {t('footer.copyright')}
          </Copyright>
          
          <MadeWith>
            {t('footer.madeWith')}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiHeart color="#ef4444" />
            </motion.div>
          </MadeWith>

          <ScrollToTop
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Scroll to top"
          >
            <FiArrowUp />
          </ScrollToTop>
        </BottomSection>
      </Container>
    </FooterContainer>
  );
};

export default Footer;