import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateOnScroll = (element, animationProps) => {
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

export const floatingAnimation = (element) => {
  gsap.to(element, {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
};