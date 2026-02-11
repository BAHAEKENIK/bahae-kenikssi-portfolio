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
`;

const MainContent = styled(motion.main)`
  position: relative;
  z-index: 1;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useScrollAnimation();

  useEffect(() => {
    // Preload critical images
    const preloadImages = async () => {
      // In the useEffect, update the imageUrls:
    const imageUrls = [
      '/assets/images/profile/profile.jpg',
      '/assets/images/projects/getjob-project.png',
      '/assets/images/projects/weatherapp-project.png',
      '/assets/images/projects/order-service-project.png',
      '/assets/images/projects/gestion-entreprise-project.png',
      '/assets/images/certificates/react-certificate.png',
      '/assets/images/certificates/sql-certificate.png',
      '/assets/images/certificates/javascript-certificate.png',
      '/assets/images/certificates/webdesign-certificate.png'
    ];

      const preloadPromises = imageUrls.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Don't reject on error, just continue
        });
      });

      await Promise.all(preloadPromises);
    };

    // Simulate loading time and preload images
    const timer = setTimeout(() => {
      preloadImages().finally(() => {
        setIsLoading(false);
      });
    }, 2000);

    return () => clearTimeout(timer);
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
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen onLoadingComplete={handleLoadingComplete} />
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
              {/* Add scroll progress indicator */}
              <div 
                className="scroll-progress" 
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                  zIndex: 9999
                }} 
              />
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
