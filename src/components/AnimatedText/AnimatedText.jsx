import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const TextContainer = styled.span`
  display: inline-block;
  position: relative;
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #f59e0b 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

const Underline = styled(motion.span)`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 2px;
`;

const AnimatedText = ({ text, delay = 0 }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay,
        staggerChildren: 0.08
      }
    }
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        delay: delay + (text.length * 0.08) + 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <TextContainer>
      <motion.span
        style={{ display: 'inline-block' }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={child}
            style={{ display: 'inline-block' }}
          >
            <GradientText>
              {char === ' ' ? '\u00A0' : char}
            </GradientText>
          </motion.span>
        ))}
      </motion.span>
      <Underline
        variants={underlineVariants}
        initial="hidden"
        animate="visible"
      />
    </TextContainer>
  );
};

export default AnimatedText;