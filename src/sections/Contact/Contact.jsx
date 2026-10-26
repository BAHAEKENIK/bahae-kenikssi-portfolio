import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import { useContactForm } from '../../hooks/useContactForm';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiMapPin, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';

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
   TYPEWRITER PLACEHOLDER COMPONENT
   ========================================= */
const TypingPlaceholder = ({ text, speed = 50, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeout;
    let interval;
    let i = 0;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <span style={{ color: '#6b625b' }}>
      {displayedText}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
        |
      </motion.span>
    </span>
  );
};

/* =========================================
   STYLED COMPONENTS
   ========================================= */
const ContactContainer = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  padding: 8rem 2rem;
  background: #0C0B0A;
  color: #F0E8DE;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  cursor: default;

  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 4rem 1rem;
  }
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: 
    linear-gradient(90deg, rgba(12,11,10,0.12) 0%, rgba(12,11,10,0.45) 28%, rgba(12,11,10,0.88) 55%, #0C0B0A 100%),
    linear-gradient(0deg, rgba(12,11,10,0.1) 0%, rgba(12,11,10,0.45) 42%, #0C0B0A 100%),
    url('/assets/images/mountains-dark3.jpg');
  background-size: cover, cover, auto 65%;
  background-position: center, center, left bottom;
  background-repeat: no-repeat;

  @media (max-width: 968px) {
    background-size: cover, cover, 150% auto;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

/* --- HEADER --- */
const Header = styled.div`
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;

  @media (max-width: 480px) {
    margin-bottom: 2.5rem;
  }
`;

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-bottom: 1rem;
  color: #F18A5B;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3.5px;
  text-transform: uppercase;

  &::before, &::after {
    content: '';
    width: 44px;
    height: 1px;
    background: #49372D;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    letter-spacing: 2px;
    gap: 10px;
    &::before, &::after { width: 25px; }
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  margin: 0;
  letter-spacing: -1px;
  color: #F0E8DE;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Underline = styled.div`
  position: relative;
  width: 112px;
  height: 13px;
  margin: 12px auto 18px;
  border-top: 4px solid #D96D42;
  border-radius: 50%;
  transform: rotate(-3deg);

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 12px;
    width: 85%;
    border-top: 2px solid #F18A5B;
    border-radius: 50%;
    transform: rotate(-2deg);
  }
`;

/* --- GRID LAYOUT --- */
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

/* --- LEFT COLUMN (INFO) --- */
const InfoColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const InfoSubtitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #F0E8DE;
  margin: 0 0 0.5rem 0;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const InfoDesc = styled.p`
  color: #C8C0B7;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  background: rgba(18, 17, 16, 0.92);
  border: 1px solid #49372D;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden; /* Prevents long text from breaking out */

  &:hover {
    border-color: #D96D42;
    transform: translateX(5px);
    background: rgba(30, 26, 24, 0.95);
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const IconBox = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(145deg, #E77C50, #AD482B);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  font-size: 1.2rem;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0; /* Important for text truncation if email is too long */
`;

const InfoLabel = styled.span`
  color: #92877D;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.2rem;
`;

const InfoValue = styled.span`
  color: #F0E8DE;
  font-size: 0.95rem;
  font-weight: 500;
  word-break: break-all;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SocialsRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  width: 45px;
  height: 45px;
  background: rgba(18, 17, 16, 0.92);
  border: 1px solid #49372D;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C8C0B7;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #D96D42;
    border-color: #D96D42;
    color: #FFF;
    transform: translateY(-3px);
  }
`;

const HandwrittenNote = styled.div`
  font-family: 'Caveat', cursive;
  font-size: 2.2rem;
  color: #F18A5B;
  transform: rotate(-5deg);
  margin-top: 1rem;
  text-align: right;
  opacity: 0.8;

  @media (max-width: 968px) {
    text-align: left;
    margin-top: 0;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

/* --- RIGHT COLUMN (FORM) --- */
const FormBox = styled(motion.form)`
  background: rgba(18, 17, 16, 0.92);
  border: 1px solid #49372D;
  border-radius: 16px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem;
  }
  @media (max-width: 480px) {
    padding: 1.2rem;
  }
`;

const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #F0E8DE;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.5rem;

  svg {
    color: #D96D42;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(12, 11, 10, 0.5);
  border: 1px solid #49372D;
  border-radius: 8px;
  padding: 1rem;
  color: #F0E8DE;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #D96D42;
    box-shadow: 0 0 0 3px rgba(217, 109, 66, 0.15);
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.85rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(12, 11, 10, 0.5);
  border: 1px solid #49372D;
  border-radius: 8px;
  padding: 1rem;
  color: #F0E8DE;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  min-height: 140px;
  resize: vertical;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #D96D42;
    box-shadow: 0 0 0 3px rgba(217, 109, 66, 0.15);
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.85rem;
    min-height: 120px;
  }
`;

const PlaceholderOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  z-index: 1;

  @media (max-width: 480px) {
    left: 0.8rem;
    font-size: 0.85rem;
  }
`;

const TextAreaPlaceholderOverlay = styled(PlaceholderOverlay)`
  top: 1rem;
  transform: none;
`;

const SubmitButton = styled(motion.button)`
  background: #D96D42;
  color: #FFF;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #F18A5B;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(217, 109, 66, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(52, 211, 153, 0.1);
  border: 1px solid rgba(52, 211, 153, 0.3);
  color: #34D399;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #EF4444;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
`;

/* =========================================
   MAIN COMPONENT
   ========================================= */
const Contact = () => {
  const { t } = useTranslation();
  const { formData, loading, success, error, handleChange, handleSubmit } = useContactForm();

  const contactInfo = [
    {
      icon: <FiMapPin />,
      label: t('contact.info.location') || 'Localisation',
      value: t('contact.info.locationValue') || 'Rabat, Maroc',
      link: 'https://www.google.com/maps/place/Rabat,+Morocco'
    },
    {
      icon: <FiMail />,
      label: t('contact.info.email') || 'Email',
      value: 'bahaekenik@gmail.com',
      link: 'mailto:bahaekenik@gmail.com'
    },
    {
      icon: <FiPhone />,
      label: t('contact.info.phone') || 'Téléphone',
      value: '+212 6 04 34 16 69',
      link: 'tel:+212604341669'
    }
  ];

  const socialLinks = [
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/bahae-kenikssi-40414021b/' },
    { icon: <FiGithub />, url: 'https://github.com/BAHAEKENIK' }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <ContactContainer id="contact">
      <CustomCursor />
      <BackgroundLayer />

      <Container>
        <Header>
          <Eyebrow>Me Contacter</Eyebrow>
          <SectionTitle>{t('contact.title') || 'Restons en Contact'}</SectionTitle>
          <Underline />
        </Header>

        <ContentGrid>
          {/* LEFT COLUMN - INFO */}
          <InfoColumn
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div>
              <InfoSubtitle as={motion.h3} variants={fadeUp}>
                {t('contact.subtitle') || "Discutons de votre prochain projet."}
              </InfoSubtitle>
              <InfoDesc as={motion.p} variants={fadeUp}>
                {t('contact.description') || "Que vous ayez une idée en tête ou que vous souhaitiez simplement dire bonjour, n'hésitez pas à me contacter."}
              </InfoDesc>
            </div>

            <InfoCards>
              {contactInfo.map((item, index) => (
                <InfoCard 
                  key={index} 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  as={motion.a}
                  variants={fadeUp}
                >
                  <IconBox>{item.icon}</IconBox>
                  <InfoText>
                    <InfoLabel>{item.label}</InfoLabel>
                    <InfoValue>{item.value}</InfoValue>
                  </InfoText>
                </InfoCard>
              ))}
            </InfoCards>

            <motion.div variants={fadeUp}>
              <InfoLabel style={{ marginBottom: '0.8rem', display: 'block' }}>
                {t('contact.followMe') || 'Suivez-moi'}
              </InfoLabel>
              <SocialsRow>
                {socialLinks.map((social, index) => (
                  <SocialIcon 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    as={motion.a}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </SocialIcon>
                ))}
              </SocialsRow>
            </motion.div>

            <HandwrittenNote as={motion.div} variants={fadeUp}>
              Build.<br/>Improve.
            </HandwrittenNote>
          </InfoColumn>

          {/* RIGHT COLUMN - FORM */}
          <FormBox
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <Label htmlFor="name">
                <FiUser /> {t('contact.name') || 'Votre Nom'}
              </Label>
              <InputWrapper>
                {!formData.name && (
                  <PlaceholderOverlay>
                    <TypingPlaceholder text="Entrez votre nom complet..." delay={1000} />
                  </PlaceholderOverlay>
                )}
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                <FiMail /> {t('contact.email') || 'Votre Email'}
              </Label>
              <InputWrapper>
                {!formData.email && (
                  <PlaceholderOverlay>
                    <TypingPlaceholder text="Entrez votre adresse email..." delay={2000} />
                  </PlaceholderOverlay>
                )}
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">
                <FiMessageSquare /> {t('contact.message') || 'Votre Message'}
              </Label>
              <InputWrapper>
                {!formData.message && (
                  <TextAreaPlaceholderOverlay>
                    <TypingPlaceholder text="Écrivez votre message ici..." delay={3000} />
                  </TextAreaPlaceholderOverlay>
                )}
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </InputWrapper>
            </FormGroup>

            {success && (
              <SuccessMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('contact.success') || 'Message envoyé avec succès !'}
              </SuccessMessage>
            )}

            {error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </ErrorMessage>
            )}

            <SubmitButton
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FiSend />
                  </motion.div>
                  {t('contact.sending') || 'Envoi en cours...'}
                </>
              ) : (
                <>
                  <FiSend />
                  {t('contact.send') || 'Envoyer le Message'}
                </>
              )}
            </SubmitButton>
          </FormBox>
        </ContentGrid>
      </Container>
    </ContactContainer>
  );
};

export default Contact;