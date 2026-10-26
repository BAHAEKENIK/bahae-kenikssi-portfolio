import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';

/* =========================================
   STYLED COMPONENTS
   ========================================= */
const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 1rem;

  &::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #D96D42, #AD482B, transparent);
    opacity: 0.6;

    @media (max-width: 768px) {
      left: 16px;
    }
    @media (max-width: 480px) {
      left: 10px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 60px;

  @media (max-width: 768px) {
    padding-left: 45px;
    margin-bottom: 2rem;
  }
  @media (max-width: 480px) {
    padding-left: 32px;
    margin-bottom: 1.5rem;
  }
`;

const TimelineDot = styled(motion.div)`
  position: absolute;
  left: 17px;
  top: 24px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #D96D42;
  border: 3px solid #0C0B0A;
  z-index: 2;
  box-shadow: 0 0 12px rgba(217, 109, 66, 0.5);

  @media (max-width: 768px) {
    left: 9px;
    width: 14px;
    height: 14px;
  }
  @media (max-width: 480px) {
    left: 4px; /* Centers the 14px dot on the 2px line at 10px left */
    top: 20px;
    border-width: 2px;
  }
`;

const TimelineContent = styled(motion.div)`
  background: rgba(18, 17, 16, 0.92);
  border: 1px solid #49372D;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  transition: all 0.3s ease;
  position: relative;
  word-break: break-word; /* Prevents long words from breaking out of the card */

  /* Hover effect only applied on devices that actually support hovering */
  @media (hover: hover) {
    &:hover {
      border-color: #D96D42;
      transform: translateX(5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(217, 109, 66, 0.1);
    }
  }

  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 1rem 1.2rem;
    border-radius: 10px;
  }
`;

const TimelineDate = styled.span`
  display: inline-block;
  background: #D96D42;
  color: #11100F;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
    margin-bottom: 0.8rem;
  }
`;

const TimelineTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #F0E8DE;
  margin: 0 0 0.4rem 0;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1.15rem;
  }
`;

const TimelineSubtitle = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #F18A5B;
  margin: 0 0 0.8rem 0;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 0.6rem;
  }
`;

const TimelineDescription = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #C8C0B7;
  font-size: 0.85rem;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

/* =========================================
   MAIN COMPONENT
   ========================================= */
const Timeline = () => {
  const { t } = useTranslation();

  const educationItems = t('about.education.items', { returnObjects: true });
  const items = Array.isArray(educationItems) ? educationItems : [];

  // Container animation: Staggers the entrance of the timeline items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Individual item animation: Slides in from the left
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Dot animation: Pops in slightly after the card
  const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <TimelineContainer>
        {items.map((item, index) => (
          <TimelineItem key={index} variants={itemVariants}>
            <TimelineDot variants={dotVariants} />
            
            <TimelineContent>
              {item.period && <TimelineDate>{item.period}</TimelineDate>}
              <TimelineTitle>{item.degree}</TimelineTitle>
              <TimelineSubtitle>{item.school}</TimelineSubtitle>
              {item.description && (
                <TimelineDescription>{item.description}</TimelineDescription>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </motion.div>
  );
};

export default Timeline;