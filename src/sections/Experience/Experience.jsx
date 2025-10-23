import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { FiCalendar, FiMapPin, FiExternalLink } from 'react-icons/fi';
const experienceData=[
  {
    "id": 1,
    "title": "Full Stack Web Developer Intern",
    "company": "Union IT Service",
    "location": "Casablanca, Morocco",
    "period": "May 2025 - June 2025",
    "description": "Participated in the development of an internal management system for companies, working on both front-end and back-end development with modern web technologies.",
    "responsibilities": [
      "Developed and maintained internal management system for employee tracking and task management",
      "Implemented secure authentication system with role-based access control",
      "Created RESTful APIs for data management and integration",
      "Developed responsive front-end interfaces using modern CSS frameworks",
      "Worked on data import/export functionality and dynamic dashboard features",
      "Collaborated with team members using Git version control"
    ],
    "technologies": [
      "Laravel",
      "PHP",
      "MVC Architecture",
      "RESTful API",
      "MySQL",
      "Blade",
      "Tailwind CSS",
      "Alpine.js",
      "JavaScript",
      "Git",
      "Laravel Breeze",
      "Spatie Permissions"
    ],
    "website": "https://uits.ma/"
  },
  {
    "id": 2,
    "title": "Web Development Student",
    "company": "Institute Specialized in Offshore Professions",
    "location": "Tetouan, Morocco",
    "period": "September 2023 - July 2025",
    "description": "Comprehensive full-stack web development training program focusing on modern technologies and best practices.",
    "responsibilities": [
      "Completed intensive training in front-end and back-end development",
      "Developed multiple full-stack projects using Laravel and React",
      "Learned database design and management with MySQL and MongoDB",
      "Studied software architecture patterns and best practices",
      "Gained experience in version control with Git and collaborative development"
    ],
    "technologies": [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Laravel",
      "PHP",
      "MySQL",
      "MongoDB",
      "Git",
      "Bootstrap",
      "Tailwind CSS",
      "RESTful APIs",
      "UML"
    ]
  }
]
const ExperienceContainer = styled.section`
  min-height: 100vh;
  padding: 5rem 2rem;
  background: rgba(15, 23, 42, 0.9);
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
  margin-bottom: 4rem;
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

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #2563eb, #7c3aed);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const ExperienceItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  padding-left: 80px;

  @media (max-width: 768px) {
    padding-left: 60px;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 22px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border: 3px solid #0f172a;
  z-index: 2;

  @media (max-width: 768px) {
    left: 12px;
    width: 14px;
    height: 14px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.2);
    animation: pulse 2s infinite;

    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0;
    }
  }
`;

const ExperienceContent = styled(motion.div)`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2563eb;
    transform: translateX(10px);
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const TitleSection = styled.div`
  flex: 1;
`;

const ExperienceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
`;

const Company = styled.h4`
  font-size: 1.1rem;
  color: #2563eb;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ExperienceMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;

  svg {
    color: #2563eb;
  }
`;

const ExperienceDescription = styled.div`
  color: #cbd5e1;
  line-height: 1.6;
`;

const ResponsibilitiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const ResponsibilityItem = styled(motion.li)`
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: #2563eb;
    font-weight: bold;
  }
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled(motion.span)`
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.3);
  color: #2563eb;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Experience = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const responsibilityVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <ExperienceContainer id="experience">
      <Container>
        <SectionTitle
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('experience.title')}
        </SectionTitle>

        <TimelineContainer>
          {experienceData.map((experience, index) => (
            <ExperienceItem
              key={experience.id}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <TimelineDot />
              <ExperienceContent
                variants={contentVariants}
                whileHover={{ scale: 1.02 }}
              >
                <ExperienceHeader>
                  <TitleSection>
                    <ExperienceTitle>
                      {experience.title}
                    </ExperienceTitle>
                    <Company>
                      {experience.company}
                    </Company>
                  </TitleSection>
                  <ExperienceMeta>
                    <MetaItem>
                      <FiCalendar />
                      <span>{experience.period}</span>
                    </MetaItem>
                    <MetaItem>
                      <FiMapPin />
                      <span>{experience.location}</span>
                    </MetaItem>
                    {experience.website && (
                      <MetaItem>
                        <FiExternalLink />
                        <a 
                          href={experience.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#64748b', textDecoration: 'none' }}
                        >
                          Website
                        </a>
                      </MetaItem>
                    )}
                  </ExperienceMeta>
                </ExperienceHeader>

                <ExperienceDescription>
                  <p>{experience.description}</p>
                  
                  {experience.responsibilities && (
                    <ResponsibilitiesList>
                      {experience.responsibilities.map((responsibility, respIndex) => (
                        <ResponsibilityItem
                          key={respIndex}
                          variants={responsibilityVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ delay: respIndex * 0.1 }}
                        >
                          {responsibility}
                        </ResponsibilityItem>
                      ))}
                    </ResponsibilitiesList>
                  )}

                  {experience.technologies && (
                    <Technologies>
                      {experience.technologies.map((tech, techIndex) => (
                        <TechTag
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </TechTag>
                      ))}
                    </Technologies>
                  )}
                </ExperienceDescription>
              </ExperienceContent>
            </ExperienceItem>
          ))}
        </TimelineContainer>
      </Container>
    </ExperienceContainer>
  );
};

export default Experience;