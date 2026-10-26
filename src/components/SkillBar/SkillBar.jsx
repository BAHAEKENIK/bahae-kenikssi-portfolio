import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { 
  SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap,
  SiLaravel, SiPhp, SiNodedotjs, SiExpress, SiMysql, SiMongodb,
  SiGit, SiDocker, SiJira, SiFramer
} from 'react-icons/si';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { FiCode } from 'react-icons/fi';

/* =========================================
   STYLED COMPONENTS
   ========================================= */
const Row = styled.div`
  display: grid;
  /* 1st col: Name (fluid), 2nd col: Progress Bar (fluid), 3rd col: % (fixed) */
  grid-template-columns: minmax(100px, 1.2fr) minmax(60px, 1fr) 36px;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  width: 100%;

  @media (max-width: 480px) {
    /* Tighten the columns on small screens to ensure the bar remains visible */
    grid-template-columns: minmax(85px, 1.1fr) minmax(50px, 1fr) 32px;
    gap: 8px;
    padding: 8px 0;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0; /* Important for text-overflow to work in flex child */

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(20px, 4vw, 26px);
  height: clamp(20px, 4vw, 26px);
  color: ${props => props.$color};
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  flex-shrink: 0;
`;

const SkillName = styled.span`
  color: #E9E1D8;
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 5px;
  background: #292725;
  border-radius: 99px;
  overflow: hidden;

  @media (max-width: 480px) {
    height: 4px; /* Slightly thinner on mobile */
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.$color};
  border-radius: 99px;
  box-shadow: 0 0 8px ${props => props.$color}44;
`;

const Percentage = styled.span`
  color: #E9E1D8;
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

/* =========================================
   ICON MAPPER
   ========================================= */
const getSkillIcon = (iconName, color) => {
  const iconProps = { color, size: '1em' };
  const icons = {
    react: <SiReact {...iconProps} />,
    javascript: <SiJavascript {...iconProps} />,
    html: <SiHtml5 {...iconProps} />,
    css: <SiCss3 {...iconProps} />,
    tailwind: <SiTailwindcss {...iconProps} />,
    bootstrap: <SiBootstrap {...iconProps} />,
    laravel: <SiLaravel {...iconProps} />,
    php: <SiPhp {...iconProps} />,
    nodejs: <SiNodedotjs {...iconProps} />,
    express: <SiExpress {...iconProps} />,
    mysql: <SiMysql {...iconProps} />,
    mongodb: <SiMongodb {...iconProps} />,
    git: <SiGit {...iconProps} />,
    docker: <SiDocker {...iconProps} />,
    vscode: <BiLogoVisualStudio {...iconProps} />,
    jira: <SiJira {...iconProps} />,
    framer: <SiFramer {...iconProps} />,
    api: <FiCode {...iconProps} />
  };
  return icons[iconName] || <FiCode {...iconProps} />;
};

/* =========================================
   COMPONENT
   ========================================= */
const SkillBar = ({ skill, index }) => {
  const { name, level, color, icon } = skill;

  return (
    <Row>
      <InfoGroup>
        <IconWrapper $color={color}>
          {getSkillIcon(icon, color)}
        </IconWrapper>
        <SkillName>{name}</SkillName>
      </InfoGroup>

      <ProgressTrack>
        <ProgressFill
          $color={color}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 1.2,
            delay: 0.1 + (index * 0.05),
            ease: [0.22, 1, 0.36, 1] // Smooth cubic-bezier easing
          }}
        />
      </ProgressTrack>

      <Percentage>{level}%</Percentage>
    </Row>
  );
};

export default SkillBar;