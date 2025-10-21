import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { 
  SiReact, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiTailwindcss, 
  SiBootstrap,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiJira,
  SiFramer
} from 'react-icons/si';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { FiCode } from 'react-icons/fi';

const SkillBarContainer = styled(motion.div)`
  width: 100%;
  margin-bottom: 1rem;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SkillInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SkillIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || '#2563eb'};
  font-size: 1.2rem;
`;

const SkillName = styled.span`
  font-weight: 600;
  color: #f8fafc;
  font-size: 0.9rem;
`;

const SkillPercentage = styled.span`
  font-weight: 600;
  color: #64748b;
  font-size: 0.8rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${props => props.color || 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'};
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const getSkillIcon = (iconName, color) => {
  const iconProps = { color, size: 20 };
  
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

const SkillBar = ({ skill, index, isActive, onHover }) => {
  const { name, level, color, icon } = skill;

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${level}%`,
      transition: {
        duration: 1.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <SkillBarContainer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
      onHoverStart={() => onHover && onHover(name)}
      onHoverEnd={() => onHover && onHover(null)}
    >
      <SkillHeader>
        <SkillInfo>
          <SkillIcon color={color}>
            {getSkillIcon(icon, color)}
          </SkillIcon>
          <SkillName>{name}</SkillName>
        </SkillInfo>
        <SkillPercentage>{level}%</SkillPercentage>
      </SkillHeader>

      <ProgressBarContainer>
        <ProgressBar
          variants={barVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          color={color}
        />
      </ProgressBarContainer>
    </SkillBarContainer>
  );
};

export default SkillBar;