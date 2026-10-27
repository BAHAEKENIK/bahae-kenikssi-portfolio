import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import { FiCode, FiFolder, FiLayers, FiBookOpen } from 'react-icons/fi';

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

/* =========================================
   TYPING EFFECT COMPONENT
   ========================================= */
const TypingEffect = ({ text, delay = 0, speed = 40 }) => {
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
  }, [text, delay, speed]);

  return (
    <span style={{ position: 'relative', display: 'inline-block', width: '100%', flex: 1, wordBreak: 'break-word' }}>
      {/* Invisible text keeps the layout stable and prevents jumping while typing */}
      <span style={{ visibility: 'hidden', pointerEvents: 'none' }}>{text}</span>
      
      <span style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'pre-wrap' }}>
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            backgroundColor: '#e97852',
            marginLeft: '4px',
            verticalAlign: 'middle',
          }}
        />
      </span>
    </span>
  );
};

/* =========================================
   STYLED COMPONENTS
   ========================================= */
const AboutContainer = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  padding: 8rem 2rem;
  background: #111213;
  color: #f1e9e1;
  font-family: 'Manrope', sans-serif;
  overflow: hidden;
  cursor: default;

  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 4rem 1rem;
  }
`;

/* --- BACKGROUND LAYER --- */
const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: 
    linear-gradient(90deg, rgba(17,18,19,0.5) 0%, rgba(17,18,19,0.7) 35%, rgba(17,18,19,0.95) 65%, #111213 100%),
    linear-gradient(0deg, rgba(8,9,9,0.4) 0%, rgba(8,9,9,0.5) 40%, #111213 95%),
    url('/assets/images/mountains-dark2.jpg');
  background-position: center, center, center;
  background-size: cover, cover, cover; /* CHANGED: Now covers the whole background */
  background-repeat: no-repeat;

  @media (max-width: 968px) {
    background-size: cover, cover, cover;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

/* --- HEADER --- */
const SectionHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 4rem;

  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
`;

const SectionNumber = styled.span`
  font-family: 'Manrope', sans-serif;
  font-size: 1.5rem;
  color: #8C5B48;
  font-weight: 500;
  
  &::before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 1px;
    background: #8C5B48;
    margin-right: 1rem;
    vertical-align: middle;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    &::before { width: 25px; margin-right: 0.5rem; }
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -1px;
  color: #f1e9e1;

  span {
    color: #e97852;
  }

  @media (max-width: 968px) {
    font-size: 2.8rem;
  }
  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

/* --- GRID LAYOUT --- */
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const LeftColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #B9B2AC;
  margin-bottom: 3rem;
  max-width: 90%;

  @media (max-width: 480px) {
    font-size: 1rem;
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

/* --- STATS --- */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 3.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(30, 31, 32, 0.4);
  backdrop-filter: blur(5px);
  border: 1px solid #343230;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease;

  &:hover {
    border-color: #8C5B48;
    background: rgba(30, 31, 32, 0.8);
  }

  @media (max-width: 600px) {
    padding: 1.2rem;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const StatIcon = styled.div`
  color: #e97852;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    margin-bottom: 0;
  }
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #f1e9e1;
  margin-bottom: 0.2rem;

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #B9B2AC;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.3;
`;

/* --- TECHNOLOGIES --- */
const TechTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: #f1e9e1;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: #e97852;
  }
`;

const SkillsList = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const SkillTag = styled(motion.span)`
  background: transparent;
  border: 1px solid #4A4A4A;
  color: #E2DAD2;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #e97852;
    color: #e97852;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
`;

const HandwrittenNote = styled.div`
  margin-top: 4rem;
  font-family: 'Caveat', cursive;
  font-size: 2.2rem;
  line-height: 1.1;
  color: #f1e9e1;
  transform: rotate(-5deg);
  display: inline-block;
  text-align: center;

  span {
    color: #e97852;
  }

  @media (max-width: 968px) {
    margin-top: 2rem;
    text-align: left;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

/* --- RIGHT COLUMN (TIMELINE) --- */
const RightColumn = styled(motion.div)`
  position: relative;
`;

const HandwrittenPath = styled.div`
  font-family: 'Caveat', cursive;
  font-size: 2rem;
  color: #e97852;
  margin-bottom: 1rem;
  transform: rotate(-3deg);

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const EduHeader = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #f1e9e1;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background: #e97852;
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    padding-left: 1.5rem;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 6px;
    left: -2.35rem;
    width: 12px;
    height: 12px;
    background: #e97852;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(233, 120, 82, 0.5);
  }

  @media (max-width: 480px) {
    &::before {
      left: -1.85rem;
      width: 10px;
      height: 10px;
    }
  }
`;

const EduCard = styled.div`
  background: rgba(30, 31, 32, 0.4);
  backdrop-filter: blur(5px);
  border: 1px solid #343230;
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;

  &:hover {
    border-color: #8C5B48;
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
  }
`;

const DateBadge = styled.span`
  display: inline-block;
  background: #e97852;
  color: #111213;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 1rem;
`;

const EduTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: #f1e9e1;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  min-height: 3rem;

  svg {
    color: #e97852;
    margin-top: 0.2rem;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const EduSchool = styled.p`
  font-size: 0.9rem;
  color: #B9B2AC;
  margin: 0 0 0.5rem 1.8rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-left: 1.5rem;
  }
`;

const EduDesc = styled.p`
  font-size: 0.85rem;
  color: #8C8C8C;
  margin: 0 0 0 1.8rem;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-left: 1.5rem;
  }
`;

/* =========================================
   MAIN COMPONENT
   ========================================= */
const About = () => {
  const { t } = useTranslation();

  const skills = [
    'React', 'Laravel', 'JavaScript', 'PHP', 'MySQL', 'MongoDB',
    'HTML/CSS', 'Tailwind', 'Bootstrap', 'Git', 'Docker', 'Node.js'
  ];

  // Fetching education data from translations
  const educationItems = t('about.education.items', { returnObjects: true }) || [];
  const eduArray = Array.isArray(educationItems) ? educationItems : [];

  // Framer motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <AboutContainer id="about">
      <CustomCursor />
      <BackgroundLayer />
      
      <Container>
        <SectionHeader
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <SectionNumber>02</SectionNumber>
          <SectionTitle>
            {t('about.title').split(' ')[0]} <span>{t('about.title').split(' ').slice(1).join(' ')}</span>
          </SectionTitle>
        </SectionHeader>

        <ContentGrid>
          {/* LEFT COLUMN */}
          <LeftColumn
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Description as={motion.p} variants={fadeUp}>
              {t('about.description')}
            </Description>

            <StatsGrid>
              <StatCard variants={fadeUp}>
                <StatIcon><FiCode /></StatIcon>
                <StatNumber>5+</StatNumber>
                <StatLabel>{t('about.experience')}</StatLabel>
              </StatCard>
              
              <StatCard variants={fadeUp}>
                <StatIcon><FiFolder /></StatIcon>
                <StatNumber>10+</StatNumber>
                <StatLabel>{t('about.projects')}</StatLabel>
              </StatCard>

              <StatCard variants={fadeUp}>
                <StatIcon><FiLayers /></StatIcon>
                <StatNumber>15+</StatNumber>
                <StatLabel>{t('about.technologies')}</StatLabel>
              </StatCard>
            </StatsGrid>

            <motion.div variants={fadeUp}>
              <TechTitle>{t('about.technologiesTitle')}</TechTitle>
              <SkillsList>
                {skills.map((skill) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </SkillsList>
            </motion.div>

            <HandwrittenNote as={motion.div} variants={fadeUp}>
              Apprendre.<br/>
              <span>Créer.</span><br/>
              Progresser.
            </HandwrittenNote>
          </LeftColumn>

          {/* RIGHT COLUMN */}
          <RightColumn
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <HandwrittenPath as={motion.div} variants={fadeUp}>
              Mon parcours
            </HandwrittenPath>
            
            <EduHeader as={motion.h3} variants={fadeUp}>
              {t('about.education.title')}
            </EduHeader>

            <TimelineContainer>
              {eduArray.map((item, index) => (
                <TimelineItem key={index} variants={fadeUp}>
                  <EduCard>
                    {item.period && <DateBadge>{item.period}</DateBadge>}
                    
                    <EduTitle>
                      <FiBookOpen />
                      <TypingEffect 
                        text={item.degree} 
                        delay={index * 1200}
                        speed={40} 
                      />
                    </EduTitle>

                    <EduSchool>{item.school}</EduSchool>
                    {item.description && <EduDesc>{item.description}</EduDesc>}
                  </EduCard>
                </TimelineItem>
              ))}
            </TimelineContainer>
          </RightColumn>
        </ContentGrid>
      </Container>
    </AboutContainer>
  );
};

export default About;