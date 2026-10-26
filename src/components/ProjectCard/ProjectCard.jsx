import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiGithub, FiExternalLink, FiBriefcase, FiCloud, FiShoppingCart, FiUsers } from 'react-icons/fi';

const Card = styled(motion.div)`
  background: rgba(18, 17, 16, 0.92);
  border: 1px solid #49372D;
  border-radius: 9px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: #D96D42;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);

    .project-image {
      transform: scale(1.05);
    }

    .project-overlay {
      opacity: 1;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2.2 / 1;
  overflow: hidden;
  background: #1B1917;

  @media (max-width: 768px) {
    aspect-ratio: 1.8 / 1; /* Taller images on mobile so the screenshots are more visible */
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(12, 11, 10, 0.7);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  /* Disable the hover overlay on touch devices to prevent bugs */
  @media (hover: none) {
    display: none;
  }
`;

const IconLink = styled(motion.a)`
  width: 45px;
  height: 45px;
  background: #D96D42;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  text-decoration: none;

  &:hover {
    background: #F18A5B;
  }
`;

const CardContent = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const IconTile = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  background: linear-gradient(145deg, #E77C50, #AD482B);

  @media (max-width: 480px) {
    width: 34px;
    height: 34px;
    font-size: 1rem;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ExternalLink = styled(motion.a)`
  color: #92877D;
  font-size: 1.2rem;
  transition: color 0.2s;
  padding: 5px; /* Larger touch target on mobile */
  margin: -5px;

  &:hover {
    color: #D96D42;
  }
`;

const Title = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  color: #F0E8DE;
  margin: 0 0 8px 0;
  line-height: 1.25;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Description = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: #C8C0B7;
  line-height: 1.65;
  margin: 0 0 14px 0;
  flex: 1;

  @media (max-width: 480px) {
    font-size: 11.5px;
    margin: 0 0 12px 0;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  color: #E6B39A;
  border: 1px solid #74412E;
  padding: 4px 10px;
  border-radius: 999px;

  @media (max-width: 480px) {
    font-size: 9px;
    padding: 3px 8px;
  }
`;

const FeaturesSection = styled.div`
  border-top: 1px solid #49372D;
  padding-top: 12px;
`;

const FeaturesTitle = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #F18A5B;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 8px 0;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 6px;
`;

const FeatureItem = styled.li`
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  color: #C8C0B7;
  position: relative;
  padding-left: 15px;
  line-height: 1.5;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #F18A5B;
    font-size: 14px;
    line-height: 1;
    top: -1px;
  }
`;

const ProjectCard = ({ project, index }) => {
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    }
  };

  const getImageSrc = () => {
    if (imageError) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTIxMTEwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Mjg3N0QiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K';
    }
    return `/assets/images/projects/${project.image}`;
  };

  const renderIcon = () => {
    switch (project.icon) {
      case 'briefcase': return <FiBriefcase />;
      case 'cloud': return <FiCloud />;
      case 'cart': return <FiShoppingCart />;
      case 'users': return <FiUsers />;
      default: return <FiBriefcase />;
    }
  };

  return (
    <Card
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <ImageContainer>
        <ProjectImage
          src={getImageSrc()}
          alt={project.title}
          className="project-image"
          onError={() => setImageError(true)}
          loading="lazy" 
        />
        <ImageOverlay className="project-overlay">
          {project.githubUrl && project.githubUrl !== '#' && (
            <IconLink href={project.githubUrl} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }}>
              <FiGithub size={20} />
            </IconLink>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <IconLink href={project.liveUrl} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }}>
              <FiExternalLink size={20} />
            </IconLink>
          )}
        </ImageOverlay>
      </ImageContainer>

      <CardContent>
        <TopRow>
          <IconTile>
            {renderIcon()}
          </IconTile>
          <Links>
            {project.githubUrl && project.githubUrl !== '#' && (
              <ExternalLink href={project.githubUrl} target="_blank" rel="noreferrer">
                <FiGithub />
              </ExternalLink>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <ExternalLink href={project.liveUrl} target="_blank" rel="noreferrer">
                <FiExternalLink />
              </ExternalLink>
            )}
          </Links>
        </TopRow>

        <Title>{project.title}</Title>
        <Description>{project.description}</Description>

        <Tags>
          {project.technologies.slice(0, 4).map((tech, i) => (
            <Tag key={i}>{tech}</Tag>
          ))}
        </Tags>

        {project.features && project.features.length > 0 && (
          <FeaturesSection>
            <FeaturesTitle>Key Features</FeaturesTitle>
            <FeaturesList>
              {project.features.slice(0, 3).map((feature, i) => (
                <FeatureItem key={i}>{feature}</FeatureItem>
              ))}
            </FeaturesList>
          </FeaturesSection>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;