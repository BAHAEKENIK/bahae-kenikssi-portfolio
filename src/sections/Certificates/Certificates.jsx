import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import CertificateCard from '../../components/CertificateCard/CertificateCard';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';

const certificatesData = [
  {
    id: 1,
    title: "React de A à Z (Hooks, Redux, Contexte inclus)",
    issuer: "Udemy",
    date: "Mars 2025",
    image: "react-certificate.png",
    description: "Cours complet sur React couvrant le développement React moderne avec les Hooks, Redux pour la gestion d'état, l'API Context et les patterns avancés de React.",
    tags: ["react", "javascript"],
    skills: ["Hooks React", "Redux", "API Context", "Cycle de vie des composants", "Gestion d'état"],
    credentialUrl: "https://www.udemy.com/certificate/UC-254633a7-c9d6-4c2c-b388-3c6023d86ca5/",
    duration: "40 heures"
  },
  {
    id: 2,
    title: "Certificat d'Achèvement SQL",
    issuer: "365 Data Science",
    date: "Novembre 2024",
    image: "sql-certificate.png",
    description: "Formation complète en SQL couvrant la conception de bases de données, les requêtes complexes, les jointures, les sous-requêtes et les techniques d'optimisation de bases de données.",
    tags: ["sql", "database"],
    skills: ["Conception de bases de données", "Requêtes complexes", "Jointures", "Sous-requêtes", "Optimisation des requêtes"],
    credentialUrl: "https://learn.365datascience.com/certificates/CC-CE3F787385/",
    duration: "30 heures"
  },
  {
    id: 3,
    title: "Algorithmes et Structures de Données JavaScript",
    issuer: "freeCodeCamp",
    date: "Octobre 2024",
    image: "javascript-certificate.png",
    description: "Cours avancé de JavaScript axé sur les algorithmes, les structures de données, les patterns de résolution de problèmes et la préparation aux entretiens techniques.",
    tags: ["javascript", "algorithms"],
    skills: ["Algorithmes", "Structures de données", "Résolution de problèmes", "Notation Big O", "Entretiens techniques"],
    credentialUrl: "https://www.freecodecamp.org/certification/fcca2ad2527-8738-46a5-b095-aafc3de476d1/javascript-algorithms-and-data-structures-v8",
    duration: "300 heures"
  },
  {
    id: 4,
    title: "Web Design Responsive",
    issuer: "freeCodeCamp",
    date: "Octobre 2023",
    image: "webdesign-certificate.png",
    description: "Cours complet de web design couvrant HTML5, CSS3, les principes du design responsive, l'accessibilité et les frameworks CSS modernes.",
    tags: ["webdesign", "html", "css"],
    skills: ["HTML5", "CSS3", "Design Responsive", "CSS Grid", "Flexbox", "Accessibilité"],
    credentialUrl: "https://www.freecodecamp.org/certification/fcca2ad2527-8738-46a5-b095-aafc3de476d1/responsive-web-design",
    duration: "300 heures"
  },
  {
    id: 5,
    title: "Programmation Java pour Débutants",
    issuer: "Coursera (Autorisé par IBM)",
    date: "2026",
    image: "java-programming-for-beginners.png",
    description: "Ce badge atteste de connaissances essentielles en programmation Java, incluant l'installation de Java (JDK, JRE, IDE), les fondamentaux de l'écosystème Java, les constructions de base du langage, les tableaux, les chaînes de caractères, les méthodes et la gestion des exceptions.",
    tags: ["java", "coursera", "ibm"],
    skills: ["Bases de Java", "Écosystème Java", "Flux de contrôle", "Exceptions", "Résolution de problèmes"],
    credentialUrl: "https://www.credly.com/badges/46cb51b9-92a8-4388-b7c1-34763c6f8ffd/linked_in_profile",
    duration: "Intermédiaire"
  },
  {
    id: 6,
    title: "Bases de Git",
    issuer: "CodeSignal",
    date: "2026",
    image: "Git Basics.webp",
    description: "Concepts et workflows fondamentaux de Git, incluant les dépôts, le suivi des modifications de code, les commits et les commandes essentielles utilisées au quotidien en développement.",
    tags: ["git", "version-control"],
    skills: ["Fondamentaux de Git", "Commits", "Gestion de dépôt", "Contrôle de version"],
    credentialUrl: "https://codesignal.com/learn/certificates/cm3q612by001a11n5gtabqn1j/courses/655",
    duration: "Certificat de cours"
  },
  {
    id: 7,
    title: "Annuler des modifications et voyager dans le temps",
    issuer: "CodeSignal",
    date: "2026",
    image: "Undoing Changes and Time Traveling.webp",
    description: "Navigation dans l'historique Git et techniques de récupération, incluant le checkout de commits précédents, l'abandon ou la réinitialisation de modifications, et l'annulation sécurisée de commits.",
    tags: ["git", "version-control"],
    skills: ["Git Checkout", "Reset", "Revert", "Navigation dans l'historique"],
    credentialUrl: "https://codesignal.com/learn/certificates/cm3q612by001a11n5gtabqn1j/courses/657",
    duration: "Certificat de cours"
  },
  {
    id: 8,
    title: "Travailler avec des dépôts distants",
    issuer: "CodeSignal",
    date: "2026",
    image: "working_with_branch.webp",
    description: "Collaboration avec des dépôts distants tels que GitHub, incluant le clonage, le push, la récupération de mises à jour et le travail avec des branches distantes.",
    tags: ["git", "github", "collaboration"],
    skills: ["Dépôts distants", "Workflow GitHub", "Clonage", "Collaboration sur branches"],
    credentialUrl: "https://codesignal.com/learn/certificates/cm3q612by001a11n5gtabqn1j/courses/658",
    duration: "Certificat de cours"
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
const CertificatesContainer = styled.section`
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
    url('/assets/images/mountains-dark2.jpg');
  background-size: cover, cover, auto 65%;
  background-position: center, center, left bottom;
  background-repeat: no-repeat;

  @media (max-width: 968px) {
    background-size: cover, cover, 150% auto;
  }
`;

const Container = styled.div`
  max-width: 1200px;
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

/* --- FILTERS & SEARCH --- */
const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex: 1;
`;

const FilterButton = styled(motion.button)`
  padding: 8px 16px;
  border: 1px solid ${props => (props.$active ? '#F18A5B' : '#49372D')};
  border-radius: 999px;
  background: ${props => (props.$active ? '#B95735' : 'rgba(18, 17, 16, 0.6)')};
  color: ${props => (props.$active ? '#FFF' : '#E4D9CD')};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #FFF4E9;
    border-color: #D96D42;
    transform: translateY(-2px);
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  background: rgba(18, 17, 16, 0.8);
  border: 1px solid #49372D;
  border-radius: 25px;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  color: #F0E8DE;
  font-size: 0.9rem;
  width: 300px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #D96D42;
    box-shadow: 0 0 0 2px rgba(217, 109, 66, 0.2);
  }

  &::placeholder {
    color: #92877D;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #92877D;
  display: flex;
  align-items: center;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #92877D;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #D96D42;
  }
`;

/* --- GRID --- */
const CertificatesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NoCertificates = styled.div`
  text-align: center;
  padding: 4rem;
  color: #92877D;
  font-size: 1.1rem;
`;

/* --- MODAL --- */
const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(8, 9, 9, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: #11100F;
  border: 1px solid #49372D;
  border-radius: 20px;
  padding: 2rem;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #292725;
`;

const ModalTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #F0E8DE;
  margin: 0 0 0.5rem 0;
`;

const ModalIssuer = styled.p`
  color: #D96D42;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ModalDate = styled.p`
  color: #92877D;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(217, 109, 66, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F18A5B;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(217, 109, 66, 0.4);
  }
`;

/* =========================================
   MAIN COMPONENT
   ========================================= */
const Certificates = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const filters = [
    { key: 'all', label: 'Tous les Certificats', icon: <FiFilter /> },
    { key: 'react', label: 'React', icon: <FiFilter /> },
    { key: 'javascript', label: 'JavaScript', icon: <FiFilter /> },
    { key: 'java', label: 'Java', icon: <FiFilter /> },
    { key: 'git', label: 'Git', icon: <FiFilter /> },
    { key: 'sql', label: 'SQL', icon: <FiFilter /> },
    { key: 'webdesign', label: 'Web Design', icon: <FiFilter /> }
  ];

  const filteredCertificates = certificatesData.filter(certificate => {
    const matchesFilter = activeFilter === 'all' || 
      certificate.title.toLowerCase().includes(activeFilter) ||
      certificate.tags.includes(activeFilter);
    
    const matchesSearch = certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.issuer.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <CertificatesContainer id="certificates">
      <CustomCursor />
      <BackgroundLayer />

      <Container>
        <Header>
          <Eyebrow>Mes Accréditations</Eyebrow>
          <SectionTitle>{t('certificates.title') || 'Certificats'}</SectionTitle>
          <Underline />
        </Header>

        <FilterSection>
          <FilterButtons>
            {filters.map((filter) => (
              <FilterButton
                key={filter.key}
                $active={activeFilter === filter.key ? 1 : 0}
                onClick={() => setActiveFilter(filter.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.icon}
                {filter.label}
              </FilterButton>
            ))}
          </FilterButtons>

          <SearchBox>
            <SearchIcon><FiSearch /></SearchIcon>
            <SearchInput
              type="text"
              placeholder="Rechercher des certificats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <ClearButton onClick={() => setSearchTerm('')}>
                <FiX />
              </ClearButton>
            )}
          </SearchBox>
        </FilterSection>

        <CertificatesGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {filteredCertificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
              onViewCertificate={setSelectedCertificate}
            />
          ))}
        </CertificatesGrid>

        {filteredCertificates.length === 0 && (
          <NoCertificates>
            Aucun certificat ne correspond à vos critères.
          </NoCertificates>
        )}

        <AnimatePresence>
          {selectedCertificate && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
            >
              <ModalContent
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <CloseButton
                  onClick={() => setSelectedCertificate(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX size={20} />
                </CloseButton>

                <ModalImage
                  src={`/assets/images/certificates/${selectedCertificate.image}`}
                  alt={selectedCertificate.title}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExMDBGIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Mjg3N0QiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNlcnRpZmljYXQgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />
                <ModalTitle>{selectedCertificate.title}</ModalTitle>
                <ModalIssuer>{selectedCertificate.issuer}</ModalIssuer>
                <ModalDate>Délivré : {selectedCertificate.date}</ModalDate>
                {selectedCertificate.description && (
                  <p style={{ color: '#C8C0B7', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {selectedCertificate.description}
                  </p>
                )}
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </Container>
    </CertificatesContainer>
  );
};

export default Certificates;