import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';

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

const TimelineItem = styled(motion.div)`
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

const TimelineContent = styled(motion.div)`
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

const TimelineDate = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
`;

const TimelineSubtitle = styled.h4`
  font-size: 1.1rem;
  color: #2563eb;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const TimelineDescription = styled.p`
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 0;
`;

const Timeline = () => {
  const { t } = useTranslation();

  const educationItems = [
    {
      id: 1,
      date: "2023 - 2025",
      title: t('about.education.degree'),
      subtitle: t('about.education.school'),
      description: t('about.education.period')
    },
    {
      id: 2,
      date: "2022 - 2023",
      title: t('about.education.baccalaureate.title'),
      subtitle: t('about.education.baccalaureate.school'),
      description: t('about.education.baccalaureate.description')
    }
  ];

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

  return (
    <TimelineContainer>
      {educationItems.map((item, index) => (
        <TimelineItem
          key={item.id}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.2 }}
        >
          <TimelineDot />
          <TimelineContent
            variants={contentVariants}
            whileHover={{ scale: 1.02 }}
          >
            <TimelineDate>{item.date}</TimelineDate>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineSubtitle>{item.subtitle}</TimelineSubtitle>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;