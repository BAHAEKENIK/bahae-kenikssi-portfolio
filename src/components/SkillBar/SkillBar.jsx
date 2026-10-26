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
  grid-template-columns: minmax(112px, 1fr) minmax(65px, 1.2fr) 34px;
  align-items: center;
  gap: 12px;
  padding: 10px 0;

  @media (max-width: 440px) {
    grid-template-columns: minmax(105px, 1fr) minmax(40px, 1fr) 32px;
    gap: 8px;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  color: ${props => props.$color};
  font-size: 1.2rem;
  flex-shrink: 0;

  @media (max-width: 440px) {
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }
`;

const SkillName = styled.span`
  color: #E9E1D8;
  font-size: 0.8rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 440px) {
    font-size: 0.7rem;
  }
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 5px;
  background: #292725;
  border-radius: 99px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.$color};
  border-radius: 99px;
  box-shadow: 0 0 8px ${props => props.$color}44;
`;

const Percentage = styled.span`
  color: #E9E1D8;
  font-size: 0.8rem;
  text-align: right;
  font-variant-numeric: tabular-nums;

  @media (max-width: 440px) {
    font-size: 0.7rem;
  }
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
            ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth easing
          }}
        />
      </ProgressTrack>

      <Percentage>{level}%</Percentage>
    </Row>
  );
};

export default SkillBar;