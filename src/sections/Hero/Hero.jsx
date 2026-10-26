import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';

const HeroContainer = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  overflow: hidden;
  background: #111213;
  color: #f1e9e1;
  font-family: 'Manrope', sans-serif;
  display: flex;
  align-items: center;
  cursor: default;

  @media (max-width: 968px) {
    flex-direction: column;
    padding-top: 100px;
  }
`;

/* --- BACKGROUND LAYERS --- */
const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: -3;
  background-image: 
    linear-gradient(90deg, rgba(17,18,19,0.08) 0%, rgba(17,18,19,0.48) 35%, rgba(17,18,19,0.94) 65%, #111213 100%),
    linear-gradient(0deg, rgba(8,9,9,0.08) 0%, rgba(8,9,9,0.35) 40%, #111213 95%),
    url('/assets/images/mountains-dark.jpg');
  background-position: center, center, left bottom;
  background-size: cover, cover, 78% auto;
  background-repeat: no-repeat;

  @media (max-width: 968px) {
    background-size: cover, cover, 150% auto;
  }
`;

const CharcoalTexture = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  opacity: 0.1;
  background-image: url('/assets/images/Charcoal.jpg');
  background-size: cover;
  mix-blend-mode: overlay;
`;

const WarmEdge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  z-index: -1;
  background-image: url('/assets/images/Warm_edge_lighting.jpg');
  background-size: cover;
  box-shadow: -8px 0 30px rgba(233, 120, 82, 0.15);
`;

/* --- MAIN LAYOUT --- */
const HeroInner = styled.div`
  width: min(100% - 64px, 1285px);
  margin-inline: auto;
  padding-block: 120px 80px;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  align-items: center;
  gap: clamp(48px, 7vw, 110px);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding-block: 60px;
  }
`;

/* --- LEFT COLUMN (TEXT) --- */
const TextContent = styled.div`
  max-width: 650px;
`;

const Eyebrow = styled(motion.p)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 19px;
  color: #a7a09a;
  -webkit-text-fill-color: #a7a09a;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 2.5px;

  @media (max-width: 968px) {
    justify-content: center;
  }

  &::before {
    content: '';
    display: block;
    width: 27px;
    height: 1px;
    background: #e97852;
  }
`;

/* --- TYPING NAME STYLES --- */
const NameContainer = styled(motion.h1)`
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(48px, 5vw, 78px);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -3.5px;
  position: relative;
  display: inline-block;
  
  color: #f1e9e1;
  -webkit-text-fill-color: #f1e9e1;
  background: none;
  -webkit-background-clip: border-box;

  @media (max-width: 968px) {
    letter-spacing: -2px;
  }
`;

const HiddenText = styled.span`
  visibility: hidden;
`;

const VisibleText = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  
  span.orange {
    color: #e97852;
    -webkit-text-fill-color: #e97852;
  }
`;

const BlinkingCursor = styled.span`
  display: inline-block;
  width: 4px;
  height: 0.85em;
  background-color: #e97852;
  margin-left: 6px;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const Role = styled(motion.div)`
  position: relative;
  display: inline-table;
  margin-top: 19px;
  padding-bottom: 15px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(17px, 1.8vw, 25px);
  color: #e2dad2;

  &::after {
    content: '';
    position: absolute;
    left: 37%;
    bottom: 0;
    width: 95px;
    height: 2px;
    background: #e97852;
    transform: rotate(-2deg);
  }
`;

const Description = styled(motion.p)`
  max-width: 510px;
  margin: 29px 0 0;
  color: #cbc5bf;
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: -0.15px;

  @media (max-width: 968px) {
    margin-inline: auto;
  }
`;

const Actions = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 35px;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  min-height: 51px;
  padding: 0 23px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    background: #e97852;
    border: 1px solid #e97852;
    color: #181310;
    &:hover { background: #f28b65; border-color: #f28b65; transform: translateY(-2px); }
  }

  &.outline {
    background: rgba(17, 18, 19, 0.2);
    border: 1px solid #8c5b48;
    color: #f1e9e1;
    &:hover { background: rgba(233, 120, 82, 0.1); border-color: #e97852; transform: translateY(-2px); }
  }
`;

const Socials = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 36px;

  @media (max-width: 968px) {
    justify-content: center;
  }

  a {
    color: #b9b2ac;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    transition: color 0.2s ease;
    &:hover { color: #e97852; }
  }

  span {
    width: 1px;
    height: 17px;
    background: #625c56;
  }
`;

/* --- RIGHT COLUMN (VISUALS) --- */
const VisualContent = styled(motion.div)`
  position: relative;
  width: min(100%, 470px);
  justify-self: center;
  aspect-ratio: 0.96;
  isolation: isolate;
`;

const PortraitFrame = styled.div`
  position: absolute;
  z-index: -1;
  top: -7%;
  right: 0;
  width: 57%;
  height: 62%;
  background: linear-gradient(145deg, #d76e4e, #ef9976 52%, #99513c);
`;

const PortraitImage = styled.img`
  position: absolute;
  top: 8%;
  left: 0;
  width: 84%;
  height: 76%;
  object-fit: cover;
  object-position: center 28%;
  border: 1px solid rgba(241, 233, 225, 0.12);
  filter: saturate(0.83) contrast(1.02);
`;

const PortraitCorner = styled.div`
  position: absolute;
  z-index: 1;
  left: -6%;
  bottom: 9%;
  width: 24%;
  height: 24%;
  border-left: 3px solid #e97852;
  border-bottom: 3px solid #e97852;
  pointer-events: none;
`;

const HandwrittenNote = styled.div`
  position: absolute;
  top: 16%;
  right: -18%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #f1e9e1;
  font-family: 'Caveat', cursive;
  font-size: clamp(24px, 2.2vw, 34px);
  line-height: 0.9;
  transform: rotate(-7deg);

  @media (max-width: 968px) {
    right: -10%;
  }
`;

const NoteArrow = styled.svg`
  width: 68px;
  height: 58px;
  margin-bottom: 6px;
  margin-left: -10px;
`;

const NoteUnderline = styled.i`
  width: 68px;
  height: 2px;
  margin-top: 8px;
  background: #e97852;
  transform: rotate(-7deg);
`;

const DeveloperTag = styled.div`
  position: absolute;
  right: -1%;
  bottom: 12%;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 13px;
  min-height: 41px;
  padding: 0 12px;
  border: 1px solid rgba(241, 233, 225, 0.17);
  background: rgba(17, 18, 19, 0.93);
  color: #c8c0b9;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  white-space: nowrap;

  span.icon {
    color: #e97852;
    font-size: 15px;
  }
`;

/* --- CUSTOM CURSOR COMPONENT --- */
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
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: '36px',
          height: '36px',
          border: '1px solid rgba(233, 120, 82, 0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          boxShadow: '0 0 15px rgba(233, 120, 82, 0.2)',
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: '6px',
          height: '6px',
          backgroundColor: '#e97852',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  );
};

/* --- MAIN HERO COMPONENT --- */
const Hero = () => {
  const { t, i18n } = useTranslation();
  
  const isFrench = i18n.language?.startsWith('fr');
  const cvFileName = isFrench ? 'bahae_kenikssi_cv_fr.pdf' : 'bahae_kenikssi_cv_en.pdf';

  const [typedText, setTypedText] = useState('');
  const [typedRole, setTypedRole] = useState('');
  
  // Typing Effect for Name & Role
  useEffect(() => {
    let nameInterval;
    let roleInterval;
    let i = 0;
    let j = 0;
    const fullName = "Bahae Kenikssi";
    const fullRole = "Full Stack Developer";

    const startDelay = setTimeout(() => {
      // 1. Type the Name
      nameInterval = setInterval(() => {
        setTypedText(fullName.substring(0, i + 1));
        i++;
        if (i === fullName.length) {
          clearInterval(nameInterval);
          
          // 2. Wait a moment, then type the Role
          setTimeout(() => {
            roleInterval = setInterval(() => {
              setTypedRole(fullRole.substring(0, j + 1));
              j++;
              if (j === fullRole.length) clearInterval(roleInterval);
            }, 50); // Role types faster
          }, 400);
        }
      }, 100); // Name types slower
    }, 800);

    return () => {
      clearTimeout(startDelay);
      if (nameInterval) clearInterval(nameInterval);
      if (roleInterval) clearInterval(roleInterval);
    };
  }, []);

  const renderTypedName = () => {
    if (typedText.length <= 6) {
      return <span>{typedText}</span>;
    }
    return (
      <>
        <span>{typedText.substring(0, 6)}</span>
        <span className="orange">{typedText.substring(6)}</span>
      </>
    );
  };

  return (
    <HeroContainer id="home">
      <CustomCursor />
      
      <BackgroundLayer />
      <CharcoalTexture />
      <WarmEdge />

      <HeroInner>
        <TextContent>
          <Eyebrow
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('hero.greeting')}
          </Eyebrow>

          <NameContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HiddenText>Bahae Kenikssi</HiddenText>
            <VisibleText>
              {renderTypedName()}
              <BlinkingCursor />
            </VisibleText>
          </NameContainer>

          <Role
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('hero.title')}
          </Role>

          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t('hero.description')}
          </Description>

          <Actions
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              className="primary"
              href={`/cv/${cvFileName}`}
              download
            >
              <span aria-hidden="true">↓</span>
              {t('hero.downloadCv')}
            </Button>

            <Button
              className="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span aria-hidden="true">✉</span>
              {t('hero.contactMe')}
            </Button>
          </Actions>

          <Socials
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a href="https://github.com/BAHAEKENIK" target="_blank" rel="noreferrer">GitHub ↗</a>
            <span />
            <a href="https://www.linkedin.com/in/bahae-kenikssi-40414021b/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <span />
            <a href="mailto:bahaekenik@gmail.com">Email ↗</a>
          </Socials>
        </TextContent>

        <VisualContent
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <PortraitFrame />
          <PortraitCorner />
          
          <PortraitImage 
            src="/assets/images/bahae-portrait.jpg" 
            alt="Portrait de Bahae Kenikssi" 
          />

          <HandwrittenNote>
            <NoteArrow viewBox="0 0 90 80" fill="none">
              <path d="M75 72C78 43 58 17 18 12" stroke="#f1e9e1" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M34 3L17 12L31 25" stroke="#f1e9e1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </NoteArrow>
            <span>Code.</span>
            <span>Build.</span>
            <span>Improve.</span>
            <NoteUnderline />
          </HandwrittenNote>

          {/* UPDATED DEVELOPER TAG WITH TYPING EFFECT */}
          <DeveloperTag>
            <span className="icon">&lt;/&gt;</span>
            <div style={{ position: 'relative' }}>
              {/* Invisible placeholder to keep the box size stable */}
              <span style={{ visibility: 'hidden' }}>Full Stack Developer</span>
              
              {/* Actual typing text */}
              <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}>
                {typedRole}
                {typedRole.length > 0 && typedRole.length < 20 && (
                  <BlinkingCursor style={{ width: '2px', height: '10px', marginLeft: '2px' }} />
                )}
              </span>
            </div>
          </DeveloperTag>
        </VisualContent>
      </HeroInner>
    </HeroContainer>
  );
};

export default Hero;