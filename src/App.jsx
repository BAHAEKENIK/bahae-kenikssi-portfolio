// Replace App.jsx with this:
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navigation from './components/Navigation/Navigation';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Experience from './sections/Experience/Experience';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import Certificates from './sections/Certificates/Certificates';
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #0C0B0A;
`;

const MainContent = styled(motion.main)`
  position: relative;
  z-index: 1;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useScrollAnimation();

  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        '/assets/images/bahae-portrait.jpg',
        '/assets/images/mountains-dark.jpg',
        '/assets/images/mountains-dark2.jpg',
        '/assets/images/mountains-dark3.jpg',
        '/assets/images/trees_montain.png',
        '/assets/images/Charcoal.jpg',
        '/assets/images/Warm_edge_lighting.jpg',
        '/assets/images/projects/getjob-project.png',
        '/assets/images/projects/weatherapp-project.png',
        '/assets/images/projects/order-service-project.png',
        '/assets/images/projects/gestion-entreprise-project.png',
      ];

      const preloadPromises = imageUrls.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(preloadPromises);
    };

    preloadImages();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.8
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        {/* Moved scroll progress outside the conditional render to fix GSAP error */}
        <div 
          className="scroll-progress" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(90deg, #AD482B, #D96D42, #F18A5B)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
            zIndex: 9999,
            boxShadow: '0 0 10px rgba(217, 109, 66, 0.5)',
            opacity: isLoading ? 0 : 1, // Hide it while loading
            transition: 'opacity 0.5s ease'
          }} 
        />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loader" onLoadingComplete={handleLoadingComplete} />
          ) : (
            <MainContent
              key="main-content"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Navigation />
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Certificates />
              <Contact />
              <Footer />
            </MainContent>
          )}
        </AnimatePresence>
      </AppContainer>
    </>
  );
}

export default App;