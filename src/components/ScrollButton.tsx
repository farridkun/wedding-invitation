import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollButton = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const sections = [
    'hero',
    'bride',
    'groom',
    'quotes',
    'akad',
    'resepsi',
    'rsvp',
    'gift',
    'lovestory',
    'wishes'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index);
            setIsVisible(index < sections.length - 1); // Hide on last section
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNextSection = () => {
    const nextSectionIndex = currentSection + 1;
    if (nextSectionIndex < sections.length) {
      const nextElement = document.getElementById(sections[nextSectionIndex]);
      if (nextElement) {
        nextElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToNextSection}
          className="scroll-button"
          aria-label="Scroll to next section"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l3 3 3-3" />
            <path d="M7 6l3 3 3-3" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollButton;
