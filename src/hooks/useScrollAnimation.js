import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollAnimation = () => {
  const scrolledRef = useRef(false);

  useEffect(() => {
    if (scrolledRef.current) return;
    scrolledRef.current = true;

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Scroll progress indicator
    gsap.to('.scroll-progress', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      },
      scaleX: 1,
      transformOrigin: 'left'
    });

    // Fade in up animation for sections
    gsap.utils.toArray('.scroll-reveal').forEach((element) => {
      gsap.fromTo(element, 
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Stagger animation for cards and lists
    gsap.utils.toArray('.stagger-animate').forEach((container) => {
      const items = container.querySelectorAll('.stagger-item');
      
      gsap.fromTo(items, 
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Scale animation for interactive elements
    gsap.utils.toArray('.scale-on-scroll').forEach((element) => {
      gsap.fromTo(element,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Parallax effect for background elements
    gsap.utils.toArray('.parallax-bg').forEach((element) => {
      gsap.to(element, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Horizontal scroll animations
    gsap.utils.toArray('.horizontal-scroll').forEach((element) => {
      gsap.fromTo(element,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

// Additional utility functions for scroll animations
export const animateOnScroll = (element, animationProps) => {
  if (typeof window === 'undefined') return;

  gsap.fromTo(element, 
    animationProps.from,
    {
      ...animationProps.to,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

export const staggerAnimation = (elements, animationProps) => {
  if (typeof window === 'undefined') return;

  gsap.fromTo(elements, 
    animationProps.from,
    {
      ...animationProps.to,
      stagger: animationProps.stagger || 0.1,
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

export const createTimelineAnimation = (elements, timelineProps) => {
  if (typeof window === 'undefined') return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  elements.forEach((element, index) => {
    tl.fromTo(element, 
      timelineProps.from,
      {
        ...timelineProps.to,
        duration: timelineProps.duration || 0.6,
        delay: index * (timelineProps.delay || 0.1)
      },
      index * (timelineProps.stagger || 0.1)
    );
  });

  return tl;
};