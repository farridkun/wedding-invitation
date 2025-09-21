import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NavigatorMenu = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { id: 'hero', label: 'Home' },
    { id: 'bride', label: 'Bride' },
    { id: 'groom', label: 'Groom' },
    { id: 'quotes', label: 'Quotes' },
    { id: 'wedding-events', label: 'Events' },
    { id: 'lovestory', label: 'Love Story' },
    { id: 'wishes', label: 'RSVP & Wishes' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      navigationItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 120;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="navigation-menu"
    >
      {canScrollLeft && (
        <div className="nav-scroll-indicator" onClick={() => scrollNav('left')}>
          <svg viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </div>
      )}

      <div className="nav-container" ref={scrollRef} onScroll={checkScrollButtons}>
        {navigationItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => scrollToSection(item.id)}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
          </motion.button>
        ))}
      </div>

      {canScrollRight && (
        <div className="nav-scroll-indicator" onClick={() => scrollNav('right')}>
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default NavigatorMenu;
