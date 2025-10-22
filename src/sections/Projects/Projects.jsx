import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

const projectsData=[
  {
    "id": 1,
    "title": "GetJob - Job Search Platform",
    "description": "Full-stack web application from A to Z with Laravel and React. Implementation of a secure RESTful API with Laravel Sanctum, real-time chat system and notifications with Laravel Reverb, admin panel with data visualization (Chart.js).",
    "image": "getjob-project.png",
    "technologies": ["Laravel 10", "React 18", "MySQL", "Bootstrap 5", "Chart.js", "Laravel Sanctum", "Laravel Reverb"],
    "githubUrl": "https://github.com/BAHAEKENIK/get-job-platform",
    "liveUrl": "https://get-job-plateform.netlify.app/",
    "tags": ["laravel", "react", "fullstack"],
    "features": ["Real-time chat", "Job search", "Admin dashboard", "RESTful API"]
  },
  {
    "id": 2,
    "title": "Weather App",
    "description": "Weather application developed with React.js and styled-components. Integration of the OpenWeatherMap API to display real-time data, city search with error management and weather icons display, dynamic interface with conditional gradient backgrounds according to temperature.",
    "image": "weatherapp-project.png",
    "technologies": ["React", "Styled Components", "OpenWeather API", "JavaScript"],
    "githubUrl": "https://github.com/BAHAEKENIK/WeatherApp",
    "liveUrl": "#",
    "tags": ["react"],
    "features": ["Real-time data", "City search", "Dynamic backgrounds", "Error handling"]
  },
  {
    "id": 3,
    "title": "Order Service with Laravel",
    "description": "Interactive web application connecting customers and service providers with service management, requests, roles and messaging.",
    "image": "order-service-project.png",
    "technologies": ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
    "githubUrl": "https://github.com/BAHAEKENIK/order_service",
    "liveUrl": "",
    "tags": ["laravel", "fullstack"],
    "features": ["Service management", "Customer-provider connection", "Messaging system", "Role management"]
  },
  {
    "id": 4,
    "title": "Company Management System",
    "description": "Interactive web application to manage employees and their time tracking, complaints, projects and company task tracking.",
    "image": "gestion-entreprise-project.png",
    "technologies": ["Laravel", "MySQL", "JavaScript", "Tailwind CSS"],
    "githubUrl": "https://github.com/BAHAEKENIK/gestion_entreprise",
    "liveUrl": "#",
    "tags": ["laravel", "fullstack"],
    "features": ["Employee management", "Time tracking", "Project management", "Task tracking"]
  }
]

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: 5rem 2rem;
  background: rgba(15, 23, 42, 0.8);
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
  margin-bottom: 3rem;
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

const FilterButtons = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' : 
    'rgba(30, 41, 59, 0.6)'};
  color: ${props => props.active ? 'white' : '#cbd5e1'};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const NoProjects = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.1rem;
`;

const Projects = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'laravel', label: 'Laravel' },
    { key: 'react', label: 'React' },
    { key: 'fullstack', label: 'Full Stack' }
  ];

  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'all') return true;
    return project.tags.includes(activeFilter);
  });

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

  const filterVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <ProjectsContainer id="projects">
      <Container>
        <SectionTitle
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('projects.title')}
        </SectionTitle>

        <FilterButtons
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filters.map((filter, index) => (
            <FilterButton
              key={filter.key}
              active={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
              variants={filterVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterButtons>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </ProjectsGrid>

        {filteredProjects.length === 0 && (
          <NoProjects
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects found for this filter.
          </NoProjects>
        )}
      </Container>
    </ProjectsContainer>
  );
};

export default Projects;