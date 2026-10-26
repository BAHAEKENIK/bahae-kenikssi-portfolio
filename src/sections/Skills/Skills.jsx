import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import skillsData from '../../data/skills.json';
import SkillBar from '../../components/SkillBar/SkillBar';
import { FiCode, FiDatabase, FiServer, FiTool } from 'react-icons/fi';

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
const SkillsContainer = styled.section`
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
    padding: 5rem 1rem;
  }
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: 
    linear-gradient(90deg, rgba(12,11,10,0.12) 0%, rgba(12,11,10,0.45) 28%, rgba(12,11,10,0.88) 55%, #0C0B0A 100%),
    linear-gradient(0deg, rgba(12,11,10,0.1) 0%, rgba(12,11,10,0.45) 42%, #0C0B0A 100%),
    url('/assets/images/trees_montain.png');
  background-size: cover, cover, auto 70%;
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
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  margin: 0;
  letter-spacing: -1px;
  color: #F0E8DE;
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

const IntroText = styled.p`
  max-width: 560px;
  margin: 0 auto;
  color: #C8C0B7;
  font-size: 0.95rem;
  line-height: 1.7;
`;

/* --- GRID & CARDS --- */
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: rgba(12, 11, 10, 0.9);
  border: 1px solid ${props => props.$featured ? '#F18A5B' : 'rgba(125, 91, 69, 0.42)'};
  border-radius: 16px;
  box-shadow: ${props => props.$featured 
    ? '0 0 0 1px rgba(217, 109, 66, 0.12), 0 0 28px rgba(217, 109, 66, 0.1)' 
    : '0 12px 32px rgba(0, 0, 0, 0.17)'};
  transition: all 0.3s ease;

  &:hover {
    border-color: #D96D42;
    box-shadow: 0 12px 34px rgba(0, 0, 0, 0.3), 0 0 20px rgba(217, 109, 66, 0.15);
  }
`;

const CardHeader = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 60px minmax(0, 1fr);
  gap: 16px;
  padding: 24px 24px 20px;
  min-height: 110px;
  border-bottom: 1px solid #49372D;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(90deg, rgba(12,11,10,0.98) 0%, rgba(12,11,10,0.84) 48%, rgba(12,11,10,0.3) 100%),
      url('/assets/images/trees_montain.png');
    background-size: cover;
    background-position: right 42%;
    z-index: 0;
  }
`;

const CategoryIcon = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 15px;
  color: #FFF8F0;
  font-size: 1.7rem;
  background: linear-gradient(145deg, #F18A5B, #B95030);
  box-shadow: 0 5px 20px rgba(217, 109, 66, 0.2);
`;

const CategoryInfo = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CategoryTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #F0E8DE;
  margin: 0 0 6px 0;
`;

const CategoryDesc = styled.p`
  color: #C8C0B7;
  font-size: 0.8rem;
  line-height: 1.5;
  margin: 0;
  max-width: 320px;
`;

const TechCount = styled.span`
  position: absolute;
  top: 24px;
  right: 24px;
  color: #F18A5B;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 1;
`;

const SkillsList = styled.div`
  padding: 16px 24px 24px;
  position: relative;
  z-index: 1;
`;

/* --- FOOTER SIGNATURE --- */
const Signature = styled.div`
  margin: 3rem 0 0 auto;
  color: #F18A5B;
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-style: italic;
  text-align: right;
`;

/* =========================================
   MAIN COMPONENT
   ========================================= */
const Skills = () => {
  const { t } = useTranslation();

  const categoryIcons = {
    frontend: <FiCode />,
    backend: <FiServer />,
    database: <FiDatabase />,
    tools: <FiTool />
  };

  const categoryDescriptions = {
    frontend: "Des interfaces modernes et réactives pour une expérience utilisateur optimale.",
    backend: "Des architectures solides pour des applications scalables et sécurisées.",
    database: "Des bases de données fiables pour des applications performantes.",
    tools: "Des outils modernes pour une meilleure productivité et collaboration."
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <SkillsContainer id="skills">
      <CustomCursor />
      <BackgroundLayer />

      <Container>
        <Header>
          <Eyebrow>Mes compétences</Eyebrow>
          <SectionTitle>{t('skills.title') || 'Compétences & Technologies'}</SectionTitle>
          <Underline />
          <IntroText>
            Les technologies que j'utilise pour créer des solutions modernes, performantes et adaptées à vos besoins.
          </IntroText>
        </Header>

        <SkillsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {Object.entries(skillsData).map(([category, skills], index) => (
            <CategoryCard
              key={category}
              variants={cardVariants}
              $featured={index === 0} // First card (Frontend) gets the glow
            >
              <CardHeader>
                <CategoryIcon>
                  {categoryIcons[category]}
                </CategoryIcon>
                <CategoryInfo>
                  <CategoryTitle>{t(`skills.${category}`) || category}</CategoryTitle>
                  <CategoryDesc>{categoryDescriptions[category]}</CategoryDesc>
                </CategoryInfo>
                <TechCount>{skills.length} technologies</TechCount>
              </CardHeader>

              <SkillsList>
                {skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={skillIndex}
                  />
                ))}
              </SkillsList>
            </CategoryCard>
          ))}
        </SkillsGrid>

        <Signature>Build · Learn · Improve</Signature>
      </Container>
    </SkillsContainer>
  );
};

export default Skills;