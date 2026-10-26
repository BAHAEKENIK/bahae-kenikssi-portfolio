import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

const projectsData = [
  {
    id: 1,
    title: "GetJob - Plateforme de Recherche d'Emploi",
    description: "Une plateforme moderne de recherche d'emploi qui connecte les candidats aux entreprises. Simple, rapide et efficace.",
    image: "getjob-project.png",
    technologies: ["React", "Laravel", "Tailwind CSS", "MySQL"],
    githubUrl: "https://github.com/BAHAEKENIK/get-job-platform",
    liveUrl: "https://get-job-plateform.netlify.app/",
    tags: ["laravel", "react", "fullstack"],
    features: ["Recherche d'offres avancée", "Profils candidats et entreprises", "Système de candidatures en ligne"],
    icon: "briefcase"
  },
  {
    id: 2,
    title: "Application Météo",
    description: "Une application météo moderne qui fournit des prévisions précises et en temps réel pour n'importe quelle ville.",
    image: "weatherapp-project.png",
    technologies: ["React", "OpenWeather API", "CSS", "Axios"],
    githubUrl: "https://github.com/BAHAEKENIK/WeatherApp",
    liveUrl: "#",
    tags: ["react"],
    features: ["Prévisions en temps réel", "Recherche par ville", "Interface rapide et responsive"],
    icon: "cloud"
  },
  {
    id: 3,
    title: "Service de Commande avec Laravel",
    description: "Une application e-commerce complète avec gestion des produits, des commandes et des clients. Basée sur Laravel, elle offre une expérience fluide et sécurisée.",
    image: "order-service-project.png",
    technologies: ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
    githubUrl: "https://github.com/BAHAEKENIK/order_service",
    liveUrl: "",
    tags: ["laravel", "fullstack"],
    features: ["Gestion des produits et stocks", "Suivi des commandes", "Espace client et administration"],
    icon: "cart"
  },
  {
    id: 4,
    title: "Système de Gestion d'Entreprise",
    description: "Une solution complète pour la gestion des employés, des projets et des ressources de l'entreprise. Simple, intuitive et sécurisée.",
    image: "gestion-entreprise-project.png",
    technologies: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    githubUrl: "https://github.com/BAHAEKENIK/gestion_entreprise",
    liveUrl: "#",
    tags: ["laravel", "fullstack"],
    features: ["Gestion des employés et départements", "Suivi des projets et tâches", "Tableaux de bord et rapports"],
    icon: "users"
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
const ProjectsContainer = styled.section`
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
    linear-gradient(90deg, rgba(12,11,10,0.08) 0%, rgba(12,11,10,0.42) 35%, #0C0B0A 72%),
    linear-gradient(0deg, rgba(12,11,10,0.08) 0%, rgba(12,11,10,0.18) 50%, #0C0B0A 100%),
    url('/assets/images/mountains-dark2.jpg');
  background-size: cover, cover, auto 65%;
  background-position: center, center, left bottom;
  background-repeat: no-repeat;

  @media (max-width: 968px) {
    background-size: cover, cover, 150% auto;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

/* --- HEADER --- */
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 480px) {
    margin-bottom: 2.5rem;
  }
`;

const HeadingDecoration = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;

  @media (max-width: 580px) {
    gap: 15px;
  }
`;

const HeadingLine = styled.span`
  width: 38px;
  height: 1px;
  background: #D96D42;

  @media (max-width: 580px) {
    width: 25px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 4vw, 46px);
  font-weight: 700;
  letter-spacing: -1px;
  margin: 0;
  color: #F0E8DE;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const HeadingUnderline = styled.div`
  width: 110px;
  height: 12px;
  margin-top: 8px;
  border-top: 3px solid #D96D42;
  border-radius: 50%;
  transform: rotate(-5deg);

  @media (max-width: 480px) {
    width: 90px;
    margin-top: 5px;
  }
`;

/* --- FILTERS --- */
const FilterButtons = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 2rem;

  @media (max-width: 480px) {
    gap: 8px;
    margin-top: 1.5rem;
  }
`;

const FilterButton = styled(motion.button)`
  padding: 9px 19px;
  border: 1px solid ${props => (props.$active ? '#F18A5B' : '#49372D')};
  border-radius: 999px;
  background: ${props => (props.$active ? '#B95735' : '#121110')};
  color: ${props => (props.$active ? '#FFF' : '#E4D9CD')};
  font: 500 12px "Poppins", sans-serif;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    color: #FFF4E9;
    border-color: #D96D42;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 7px 14px;
    font-size: 11px;
  }
`;

/* --- GRID --- */
const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  width: 100%;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 15px;
  }

  @media (max-width: 580px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }
`;

const NoProjects = styled.div`
  text-align: center;
  color: #92877D;
  padding: 3rem;

  @media (max-width: 480px) {
    padding: 2rem 1rem;
    font-size: 0.9rem;
  }
`;

/* =========================================
   MAIN COMPONENT
   ========================================= */
const Projects = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: t('projects.filters.all') || 'Tous les Projets' },
    { key: 'laravel', label: t('projects.filters.laravel') || 'Laravel' },
    { key: 'react', label: t('projects.filters.react') || 'React' },
    { key: 'fullstack', label: t('projects.filters.fullstack') || 'Full Stack' }
  ];

  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'all') return true;
    return project.tags.includes(activeFilter);
  });

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
    <ProjectsContainer id="projects">
      <CustomCursor />
      <BackgroundLayer />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <Header>
            <HeadingDecoration>
              <HeadingLine />
              <SectionTitle>{t('projects.title') || 'Mes Projets'}</SectionTitle>
              <HeadingLine />
            </HeadingDecoration>
            <HeadingUnderline />
            
            <FilterButtons>
              {filters.map((filter) => (
                <FilterButton
                  key={filter.key}
                  $active={activeFilter === filter.key ? 1 : 0}
                  onClick={() => setActiveFilter(filter.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter.label}
                </FilterButton>
              ))}
            </FilterButtons>
          </Header>
        </motion.div>

        <ProjectsGrid
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </ProjectsGrid>

        {filteredProjects.length === 0 && (
          <NoProjects>{t('projects.noProjects') || 'Aucun projet trouvé.'}</NoProjects>
        )}
      </Container>
    </ProjectsContainer>
  );
};

export default Projects;