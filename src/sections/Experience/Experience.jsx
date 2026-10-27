import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import { FiCalendar, FiMapPin, FiExternalLink } from 'react-icons/fi';

const experienceData = [
  {
    id: 1,
    title: "Stagiaire Développeur Full Stack",
    company: "Hutchinson Maroc",
    location: "Tanger, Maroc",
    period: "Avril 2026 - Juillet 2026",
    description: "Participation au développement et à la maintenance des applications internes de l'entreprise. Travail sur des fonctionnalités full stack avec React et Spring Boot, en collaboration avec l'équipe IT.",
    responsibilities: [
      "Développement et maintenance d'applications full-stack avec React et Spring Boot",
      "Conception et gestion de bases de données relationnelles avec SQL Server et MySQL",
      "Déploiement local d'applications avec configuration serveur et mise en place de l'environnement",
      "Création de diagrammes UML pour l'architecture système et la conception d'applications",
      "Débogage et optimisation du code à l'aide d'outils d'IA comme Claude et Codex"
    ],
    technologies: ["Spring Boot", "React", "SQL Server", "MySQL", "UML", "Git"]
  },
  {
    id: 2,
    title: "Stagiaire Développeur Web Full Stack",
    company: "Union IT Service",
    location: "Casablanca, Maroc",
    period: "Mai 2025 - Juin 2025",
    description: "Développement d'applications web et participation à la création de sites vitrines et d'outils internes. Travail en équipe sur des projets front-end et back-end.",
    responsibilities: [
      "Développement et maintenance d'un système de gestion interne pour le suivi des employés",
      "Mise en place d'un système d'authentification sécurisé avec contrôle d'accès basé sur les rôles",
      "Création d'API RESTful pour la gestion et l'intégration des données",
      "Développement d'interfaces front-end responsives avec des frameworks CSS modernes",
      "Collaboration avec les membres de l'équipe via le contrôle de version Git"
    ],
    technologies: ["React", "Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    website: "https://uits.ma/"
  },
  {
    id: 3,
    title: "Étudiant en Développement Web",
    company: "Institut Spécialisé dans les Métiers de l'Offshoring",
    location: "Tétouan, Maroc",
    period: "Septembre 2023 - Juin 2025",
    description: "Formation en développement web et acquisition des bases en front-end et back-end. Réalisation de projets académiques et développement de compétences en technologies modernes du web.",
    responsibilities: [
      "Création de sites web dynamiques avec HTML, CSS, JavaScript et PHP",
      "Apprentissage des bases de données et de la logique de programmation",
      "Développement de plusieurs projets full-stack avec Laravel et React",
      "Travail sur des projets pratiques et amélioration continue des compétences"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Laravel", "React"]
  }
];

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
const ExperienceContainer = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  padding: 8rem 2rem;
  background: #111213;
  color: #F0E8DC;
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
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

/* --- HEADER --- */
const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    margin-bottom: 3.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -1px;
  color: #F0E8DC;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%) rotate(-2deg);
    width: 120px;
    height: 3px;
    background: #D97850;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
  @media (max-width: 480px) {
    font-size: 2.2rem;
    
    &::after {
      width: 90px;
      bottom: -12px;
    }
  }
`;

/* --- TIMELINE LAYOUT --- */
const TimelineContainer = styled.div`
  position: relative;
  padding-left: 3rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background: #D97850;
    opacity: 0.4;
  }

  @media (max-width: 768px) {
    padding-left: 2rem;
  }
  @media (max-width: 480px) {
    padding-left: 1.5rem;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: -3.35rem;
    width: 12px;
    height: 12px;
    background: #D97850;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(217, 120, 80, 0.4);
    z-index: 2;
  }

  /* Decorative slashes on the right */
  &::after {
    content: '//';
    position: absolute;
    right: -40px;
    top: 30px;
    font-family: 'Caveat', cursive;
    color: #D97850;
    font-size: 1.5rem;
    opacity: 0.6;
    transform: rotate(15deg);
  }

  @media (max-width: 768px) {
    &::before {
      left: -2.35rem;
    }
    &::after {
      display: none;
    }
  }
  @media (max-width: 480px) {
    margin-bottom: 2rem;
    &::before {
      left: -1.85rem;
      width: 10px;
      height: 10px;
    }
  }
`;

/* --- CARD STYLES --- */
const Card = styled.div`
  background: rgba(26, 25, 23, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid #494039;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: #D97850;
    background: rgba(35, 33, 30, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 1.2rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const TitleGroup = styled.div`
  flex: 1;
  width: 100%;
`;

const JobTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #F0E8DC;
  margin: 0 0 0.4rem 0;
  line-height: 1.2;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const CompanyName = styled.div`
  font-family: 'Manrope', sans-serif;
  font-size: 0.85rem;
  color: #D97850;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* Allows long names to wrap safely */
  gap: 0.5rem;
`;

const WebsiteLink = styled.a`
  color: #D97850;
  display: flex;
  align-items: center;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
`;

const MetaGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap; /* Prevents overlapping on narrow screens */
    gap: 1rem;
    margin-top: 0.5rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #C5BDB4;
  font-size: 0.85rem;
  word-break: break-word;

  svg {
    color: #D97850;
    flex-shrink: 0; /* Keeps icon from squishing */
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Description = styled.p`
  color: #C5BDB4;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const ListItem = styled.li`
  color: #C5BDB4;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.6rem;
  position: relative;
  padding-left: 1.2rem;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #D97850;
    font-size: 1.2rem;
    line-height: 1;
    top: -1px;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const TechTag = styled.span`
  border: 1px solid #494039;
  color: #F0E8DC;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    border-color: #D97850;
    color: #D97850;
  }

  @media (max-width: 480px) {
    padding: 0.2rem 0.6rem;
    font-size: 0.7rem;
  }
`;

/* =========================================
   MAIN COMPONENT
   ========================================= */
const Experience = () => {
  const { t } = useTranslation();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <ExperienceContainer id="experience">
      <CustomCursor />
      <BackgroundLayer />
      
      <Container>
        <SectionHeader
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <SectionTitle>{t('experience.title')}</SectionTitle>
        </SectionHeader>

        <TimelineContainer
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {experienceData.map((experience) => (
            <TimelineItem key={experience.id} variants={fadeUp}>
              <Card>
                <CardHeader>
                  <TitleGroup>
                    <JobTitle>{experience.title}</JobTitle>
                    <CompanyName>
                      {experience.company}
                      {experience.website && (
                        <WebsiteLink
                          href={experience.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Visiter le site web"
                        >
                          <FiExternalLink size={14} />
                        </WebsiteLink>
                      )}
                    </CompanyName>
                  </TitleGroup>
                  
                  <MetaGroup>
                    <MetaItem>
                      <FiCalendar />
                      <span>{experience.period}</span>
                    </MetaItem>
                    <MetaItem>
                      <FiMapPin />
                      <span>{experience.location}</span>
                    </MetaItem>
                  </MetaGroup>
                </CardHeader>

                <Description>{experience.description}</Description>

                {experience.responsibilities && (
                  <List>
                    {experience.responsibilities.map((resp, index) => (
                      <ListItem key={index}>{resp}</ListItem>
                    ))}
                  </List>
                )}

                {experience.technologies && (
                  <TechStack>
                    {experience.technologies.map((tech, index) => (
                      <TechTag key={index}>{tech}</TechTag>
                    ))}
                  </TechStack>
                )}
              </Card>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </ExperienceContainer>
  );
};

export default Experience;