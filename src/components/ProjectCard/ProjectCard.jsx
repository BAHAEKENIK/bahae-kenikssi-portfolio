import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';

const Card = styled(motion.div)`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;

  &:hover {
    border-color: #2563eb;
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2);

    .project-image {
      transform: scale(1.1);
    }

    .project-overlay {
      opacity: 1;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: rgba(15, 23, 42, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #2563eb;
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const FolderIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const ExternalLinks = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const ProjectDescription = styled.p`
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.3);
  color: #2563eb;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ProjectFeatures = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

const FeaturesTitle = styled.h4`
  font-size: 0.9rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  color: #cbd5e1;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  position: relative;
  padding-left: 1rem;

  &::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: #2563eb;
  }
`;

const ProjectCard = ({ project, index }) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUUyOTNCIi8+CjxwYXRoIGQ9Ik0xMDAgODBDMTMzLjMzNyA4MCAxNjAgMTA2LjY2MyAxNjAgMTQwQzE2MCAxNzMuMzM3IDEzMy4zMzcgMjAwIDEwMCAyMDAiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiMyNTYzRUIiIG9wYWNpdHk9IjAuMyIvPgo8dGV4dCB4PSIyMDAiIHk9IjExMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjQ3NDhCIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9qZWN0IEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    }
    return `/assets/images/projects/${project.image}`;
  };

  return (
    <Card
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
    >
      <ImageContainer>
        <ProjectImage
          src={getImageSrc()}
          alt={project.title}
          className="project-image"
          onError={handleImageError}
        />
        <ImageOverlay className="project-overlay">
          <ProjectLinks>
            {project.githubUrl && project.githubUrl !== '#' && (
              <IconLink
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
              >
                <FiGithub size={20} />
              </IconLink>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <IconLink
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
              >
                <FiExternalLink size={20} />
              </IconLink>
            )}
          </ProjectLinks>
        </ImageOverlay>
      </ImageContainer>

      <CardContent>
        <ProjectHeader>
          <FolderIcon>
            <FiFolder />
          </FolderIcon>
          <ExternalLinks>
            {project.githubUrl && project.githubUrl !== '#' && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: '#64748b', marginLeft: '0.5rem' }}
              >
                <FiGithub size={20} />
              </motion.a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: '#64748b', marginLeft: '0.5rem' }}
              >
                <FiExternalLink size={20} />
              </motion.a>
            )}
          </ExternalLinks>
        </ProjectHeader>

        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>

        <Technologies>
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <TechTag key={techIndex}>{tech}</TechTag>
          ))}
          {project.technologies.length > 4 && (
            <TechTag>+{project.technologies.length - 4}</TechTag>
          )}
        </Technologies>

        {project.features && project.features.length > 0 && (
          <ProjectFeatures>
            <FeaturesTitle>Key Features</FeaturesTitle>
            <FeaturesList>
              {project.features.slice(0, 3).map((feature, featureIndex) => (
                <FeatureItem key={featureIndex}>{feature}</FeatureItem>
              ))}
            </FeaturesList>
          </ProjectFeatures>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;