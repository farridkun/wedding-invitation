import { motion } from 'framer-motion';
import Countdown from './Countdown';
import ImageSlider from './ImageSlider';
import type { Guest } from '../services/googleSheets';
import { heroImages } from '../utils/images';

interface HeroProps {
  guest: Guest | null;
}

const Hero = ({ guest }: HeroProps) => {
  // Hero background images for auto-sliding
  const images = heroImages;

  return (
    <section id="hero" className="hero">
      {/* Floating Decorative Elements */}
      <div className="hero-decoration decoration-1">❀</div>
      <div className="hero-decoration decoration-2">♥</div>
      <div className="hero-decoration decoration-3">✦</div>
      <div className="hero-decoration decoration-4">❀</div>
      <div className="hero-decoration decoration-5">♥</div>
      <div className="hero-decoration decoration-6">✦</div>

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
          <h1>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem', color: '#fff' }}>The Wedding of</span>
            <span style={{ fontSize: '3rem', display: 'block' }}>Avni & Dea</span>
          </h1>
          <p>Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
          <p>Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i{guest && guest.Nama !== 'Guest' ? ` ${guest.Nama}` : ''} untuk menghadiri acara pernikahan kami:</p>
          <Countdown />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
