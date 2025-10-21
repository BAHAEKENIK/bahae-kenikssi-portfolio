import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import skillsData from '../../data/skills.json';
import SkillBar from '../../components/SkillBar/SkillBar';
import { FiCode, FiDatabase, FiServer, FiTool } from 'react-icons/fi';

const SkillsContainer = styled.section`
  min-height: 100vh;
  padding: 5rem 2rem;
  background: rgba(15, 23, 42, 0.7);
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SkillCategory = styled(motion.div)`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2563eb;
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(37, 99, 235, 0.2);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CategoryIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f8fafc;
  margin: 0;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LanguagesSection = styled(motion.div)`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
`;

const LanguagesTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const LanguagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const LanguageItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.3);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.2);
    transform: translateY(-3px);
  }
`;

const LanguageName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
`;

const LanguageLevel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
`;

const Skills = () => {
  const { t } = useTranslation();
  const [activeSkill, setActiveSkill] = useState(null);

  const categoryIcons = {
    frontend: <FiCode />,
    backend: <FiServer />,
    database: <FiDatabase />,
    tools: <FiTool />
  };

  const languages = [
    { name: 'Arabic', level: 'Native', flag: '🇲🇦' },
    { name: 'French', level: 'B1', flag: '🇫🇷' },
    { name: 'English', level: 'B1', flag: '🇬🇧' }
  ];

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

  const languageVariants = {
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

  return (
    <SkillsContainer id="skills">
      <Container>
        <SectionTitle
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('skills.title')}
        </SectionTitle>

        <SkillsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {Object.entries(skillsData).map(([category, skills], index) => (
            <SkillCategory
              key={category}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <CategoryHeader>
                <CategoryIcon>
                  {categoryIcons[category]}
                </CategoryIcon>
                <CategoryTitle>
                  {t(`skills.${category}`)}
                </CategoryTitle>
              </CategoryHeader>

              <SkillsList>
                {skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={skillIndex}
                    isActive={activeSkill === skill.name}
                    onHover={setActiveSkill}
                  />
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>

        <LanguagesSection
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <LanguagesTitle>Languages</LanguagesTitle>
          <LanguagesGrid>
            {languages.map((language, index) => (
              <LanguageItem
                key={language.name}
                variants={languageVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {language.flag}
                </div>
                <LanguageName>{language.name}</LanguageName>
                <LanguageLevel>{language.level}</LanguageLevel>
              </LanguageItem>
            ))}
          </LanguagesGrid>
        </LanguagesSection>
      </Container>
    </SkillsContainer>
  );
};

export default Skills;