import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import CertificateCard from '../../components/CertificateCard/CertificateCard';
import { FiFilter, FiX } from 'react-icons/fi';
const certificatesData=[
  {
    "id": 1,
    "title": "React from A to Z (Hooks, Redux, Context included)",
    "issuer": "Udemy",
    "date": "March 2025",
    "image": "react-certificate.png",
    "description": "Comprehensive React course covering modern React development with Hooks, Redux for state management, Context API, and advanced React patterns.",
    "tags": ["react", "javascript"],
    "skills": ["React Hooks", "Redux", "Context API", "Component Lifecycle", "State Management"],
    "credentialUrl": "https://www.udemy.com/certificate/UC-254633a7-c9d6-4c2c-b388-3c6023d86ca5/",
    "duration": "40 hours"
  },
  {
    "id": 2,
    "title": "SQL Certificate of Completion",
    "issuer": "365 Data Science",
    "date": "November 2024",
    "image": "sql-certificate.png",
    "description": "Comprehensive SQL training covering database design, complex queries, joins, subqueries, and database optimization techniques.",
    "tags": ["sql", "database"],
    "skills": ["Database Design", "Complex Queries", "Joins", "Subqueries", "Query Optimization"],
    "credentialUrl": "https://learn.365datascience.com/certificates/CC-CE3F787385/",
    "duration": "30 hours"
  },
  {
    "id": 3,
    "title": "JavaScript Algorithms and Data Structures",
    "issuer": "freeCodeCamp",
    "date": "October 2024",
    "image": "javascript-certificate.png",
    "description": "Advanced JavaScript course focusing on algorithms, data structures, problem-solving patterns, and technical interview preparation.",
    "tags": ["javascript", "algorithms"],
    "skills": ["Algorithms", "Data Structures", "Problem Solving", "Big O Notation", "Technical Interviews"],
    "credentialUrl": "https://www.freecodecamp.org/certification/fcca2ad2527-8738-46a5-b095-aafc3de476d1/javascript-algorithms-and-data-structures-v8",
    "duration": "300 hours"
  },
  {
    "id": 4,
    "title": "Responsive Web Design",
    "issuer": "freeCodeCamp",
    "date": "October 2023",
    "image": "webdesign-certificate.png",
    "description": "Comprehensive web design course covering HTML5, CSS3, responsive design principles, accessibility, and modern CSS frameworks.",
    "tags": ["webdesign", "html", "css"],
    "skills": ["HTML5", "CSS3", "Responsive Design", "CSS Grid", "Flexbox", "Accessibility"],
    "credentialUrl": "https://www.freecodecamp.org/certification/fcca2ad2527-8738-46a5-b095-aafc3de476d1/responsive-web-design",
    "duration": "300 hours"
  },
  {
    "id": 5,
    "title": "Java Programming for Beginners",
    "issuer": "Coursera (Authorized by IBM)",
    "date": "2026",
    "image": "java-programming-for-beginners.png",
    "description": "This badge earner has essential knowledge of Java programming, including Java setup (JDK, JRE, IDE), Java ecosystem fundamentals, core language constructs, arrays, strings, methods, and exception handling.",
    "tags": ["java", "coursera", "ibm"],
    "skills": ["Java Basics", "Java Ecosystem", "Control Flow", "Exceptions", "Problem Solving"],
    "credentialUrl": "https://www.credly.com/badges/46cb51b9-92a8-4388-b7c1-34763c6f8ffd/linked_in_profile",
    "duration": "Intermediate"
  },
  {
    "id": 6,
    "title": "Git Basics",
    "issuer": "CodeSignal",
    "date": "2026",
    "image": "Git Basics.webp",
    "description": "Fundamental Git concepts and workflows, including repositories, tracking code changes, commits, and essential commands used in daily development.",
    "tags": ["git", "version-control"],
    "skills": ["Git Fundamentals", "Commits", "Repository Management", "Version Control"],
    "credentialUrl": "https://codesignal.com/learn/certificates/cm3q612by001a11n5gtabqn1j/courses/655",
    "duration": "Course Certificate"
  },
  {
    "id": 7,
    "title": "Undoing Changes and Time Traveling",
    "issuer": "CodeSignal",
    "date": "2026",
    "image": "Undoing Changes and Time Traveling.webp",
    "description": "Git history navigation and recovery techniques, including checkout of previous commits, discarding or resetting changes, and safely reverting commits.",
    "tags": ["git", "version-control"],
    "skills": ["Git Checkout", "Reset", "Revert", "History Navigation"],
    "credentialUrl": "https://codesignal.com/learn/certificates/cm3q612by001a11n5gtabqn1j/courses/657",
    "duration": "Course Certificate"
  },
  {
    "id": 8,
    "title": "Working with Remote Repositories",
    "issuer": "CodeSignal",
    "date": "2026",
    "image": "working_with_branch.webp",
    "description": "Collaboration with remote repositories such as GitHub, including cloning, pushing, fetching updates, and working with remote branches.",
    "tags": ["git", "github", "collaboration"],
    "skills": ["Remote Repositories", "GitHub Workflow", "Cloning", "Branch Collaboration"],
    "credentialUrl": "https://codesignal.com/learn/certificates/cm3q612by001a11n5gtabqn1j/courses/658",
    "duration": "Course Certificate"
  }
]
const CertificatesContainer = styled.section`
  min-height: 100vh;
  padding: 5rem 2rem;
  background: rgba(15, 23, 42, 0.8);
  position: relative;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Roboto Slab', serif;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const FilterSection = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' : 
    'rgba(30, 41, 59, 0.6)'};
  color: ${props => props.active ? 'white' : '#cbd5e1'};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const SearchBox = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const SearchInput = styled.input`
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  color: #f8fafc;
  font-size: 1rem;
  width: 300px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: #64748b;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ClearButton = styled(motion.button)`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;

  &:hover {
    color: #2563eb;
    background: rgba(37, 99, 235, 0.1);
  }
`;

const CertificatesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const NoCertificates = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.1rem;
  grid-column: 1 / -1;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: #1e293b;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  color: #f8fafc;
  margin-bottom: 0.5rem;
`;

const ModalIssuer = styled.p`
  color: #2563eb;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ModalDate = styled.p`
  color: #64748b;
  margin-bottom: 1rem;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(37, 99, 235, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background: rgba(37, 99, 235, 0.4);
  }
`;

const Certificates = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const filters = [
    { key: 'all', label: 'All Certificates', icon: <FiFilter /> },
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const filterVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <CertificatesContainer id="certificates">
      <Container>
        <SectionTitle
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('certificates.title')}
        </SectionTitle>

        <FilterSection
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FilterButtons>
            {filters.map((filter, index) => (
              <FilterButton
                key={filter.key}
                active={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                {filter.icon}
                {filter.label}
              </FilterButton>
            ))}
          </FilterButtons>

          <SearchBox
            variants={filterVariants}
            transition={{ delay: 0.5 }}
          >
            <SearchInput
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <ClearButton
                onClick={() => setSearchTerm('')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
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
          <NoCertificates
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No certificates found matching your criteria.
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
                  <FiX />
                </CloseButton>

                <ModalImage
                  src={`/assets/images/certificates/${selectedCertificate.image}`}
                  alt={selectedCertificate.title}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMUUyOTNCIi8+CjxjaXJjbGUgY3g9IjMwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiMyNTYzRUIiIG9wYWNpdHk9IjAuMyIvPgo8dGV4dCB4PSIzMDAiIHk9IjI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjQ3NDhCIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DZXJ0aWZpY2F0ZSBJbWFnZTwvdGV4dD4KPHRleHQgeD0iMzAwIiBllPSIyODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY0NzQ4QiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm90IGF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+';
                  }}
                />
                <ModalTitle>{selectedCertificate.title}</ModalTitle>
                <ModalIssuer>{selectedCertificate.issuer}</ModalIssuer>
                <ModalDate>Issued: {selectedCertificate.date}</ModalDate>
                {selectedCertificate.description && (
                  <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
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
