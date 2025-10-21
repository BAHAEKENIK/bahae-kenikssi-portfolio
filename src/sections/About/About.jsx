import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Timeline from '../../components/Timeline/Timeline';

const AboutContainer = styled.section`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #cbd5e1;
  margin-bottom: 1rem;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: #2563eb;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SkillsList = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const SkillTag = styled(motion.span)`
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.3);
  color: #2563eb;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.2);
    transform: translateY(-2px);
  }
`;

const TimelineSection = styled(motion.div)`
  margin-top: 3rem;
`;

const About = () => {
  const { t } = useTranslation();

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

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  const skills = [
    'React', 'Laravel', 'JavaScript', 'PHP', 'MySQL', 'MongoDB',
    'HTML/CSS', 'Tailwind', 'Bootstrap', 'Git', 'Docker', 'Node.js'
  ];

  return (
    <AboutContainer id="about">
      <Container>
        <SectionTitle
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('about.title')}
        </SectionTitle>

        <ContentGrid>
          <TextContent
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Description variants={itemVariants}>
              {t('about.description')}
            </Description>

            <StatsGrid variants={itemVariants}>
              <StatCard
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>1+</StatNumber>
                <StatLabel>{t('about.experience')}</StatLabel>
              </StatCard>

              <StatCard
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>10+</StatNumber>
                <StatLabel>{t('about.projects')}</StatLabel>
              </StatCard>

              <StatCard
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>15+</StatNumber>
                <StatLabel>{t('about.technologies')}</StatLabel>
              </StatCard>
            </StatsGrid>

            <motion.div variants={itemVariants}>
              <h3 style={{ color: '#2563eb', marginBottom: '1rem' }}>
                Technologies I Work With
              </h3>
              <SkillsList>
                {skills.map((skill, index) => (
                  <SkillTag
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </SkillTag>
                ))}
              </SkillsList>
            </motion.div>
          </TextContent>

          <TimelineSection
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3 
              variants={itemVariants}
              style={{ 
                color: '#2563eb', 
                marginBottom: '2rem',
                fontSize: '1.5rem'
              }}
            >
              {t('about.education.title')}
            </motion.h3>
            <Timeline />
          </TimelineSection>
        </ContentGrid>
      </Container>
    </AboutContainer>
  );
};

export default About;