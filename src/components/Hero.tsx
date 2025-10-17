import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import type { Guest } from '../services/googleSheets';
import { heroImages } from '../utils/images';
import avniDeaLogo from '../assets/avni-dea-logo.png';

interface HeroProps {
  guest: Guest | null;
}

const Hero = ({}: HeroProps) => {
  // Hero background images for auto-sliding
  const images = heroImages;

  return (
    <section id="hero" className="hero">
      {/* Logo from assets > avni-dea-logo.png */}

      <div className="hero-background">
        <ImageSlider
          images={images}
          interval={5000} // 5 seconds for hero auto-slide
          autoplay={true}
          showDots={false}
          showNavigation={false}
          aspectRatio="16/9"
          className="hero-slider"
          lazy={false} // Disable lazy loading for hero images
        />
        <div className="hero-overlay">
          <div className="hero-gradient"></div>
        </div>
      </div>
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        <img
          src={avniDeaLogo}
          alt="Avni & Dea Logo"
          style={{
            width: '100px',
            height: '100px',
            filter: 'brightness(0) invert(1)',
            marginBottom: '-12px',
          }}
        />
          <h1>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem', color: '#fff', fontFamily: 'Outfit' }}>The Wedding of</span>
            <span style={{ fontSize: '3rem', display: 'block' }}>Avni & Dea</span>
          </h1>
          <h1>
            <span style={{ fontSize: '1rem', display: 'block', marginBottom: '1.5rem', color: '#fff', letterSpacing: 1.5, fontFamily: 'Outfit' }}>09 November 2025</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
