import React from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

// Conteneur principal du texte
const TextContainer = styled.span`
  display: inline-block;
  position: relative;
  perspective: 800px; /* nécessaire pour l'effet 3D des lettres */
`;

// Texte avec dégradé animé
const GradientText = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #f59e0b 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
  transition: filter 0.25s ease;

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }
`;

// Lettre individuelle (porte l'effet de survol)
const Letter = styled(motion.span)`
  display: inline-block;
  transform-style: preserve-3d;
  will-change: transform;

  &:hover ${GradientText} {
    filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.8));
  }
`;

// Barre de soulignement animée
const Underline = styled(motion.span)`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  border-radius: 2px;
  overflow: hidden;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);

  /* Reflet lumineux qui balaye le soulignement en boucle */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -40%;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.9),
      transparent
    );
    animation: ${keyframes`
      0%   { left: -40%; }
      100% { left: 140%; }
    `} 2.8s ease-in-out infinite;
  }
`;

const AnimatedText = ({ text, delay = 0 }) => {
  // Animation du conteneur : apparition + déclenchement en cascade des lettres
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  // Animation de chaque lettre : flou + montée + rotation 3D + ressort
  const child = {
    hidden: {
      opacity: 0,
      y: 24,
      rotateX: -90,
      scale: 0.6,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 120,
      },
    },
  };

  // Animation du soulignement : tracé de gauche à droite
  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: delay + text.length * 0.08 + 0.3,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
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
          <Letter
            key={index}
            variants={child}
            // Effet de vague au survol de chaque lettre
            whileHover={{
              y: -6,
              scale: 1.18,
              rotate: index % 2 === 0 ? -4 : 4,
              transition: { type: 'spring', stiffness: 300, damping: 14 },
            }}
          >
            <GradientText
              // Décalage du dégradé par lettre : le dégradé continue
              // visuellement sur toute la phrase au lieu de repartir à zéro
              style={{ backgroundPosition: `${index * 6}% 50%` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </GradientText>
          </Letter>
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