import { motion } from 'framer-motion';
import Countdown from './Countdown';
import { Parallax } from 'react-scroll-parallax';
import { countDownImages } from '../utils/images';
import ImageSlider from './ImageSlider';

const CountdownSection = () => {
  return (
    <section id="countdown-section" className="countdown-section">
      <div className="countdown-background">
        <ImageSlider
          images={countDownImages}
          interval={5000} // 5 seconds for auto-slide
          autoplay={true}
          showDots={false}
          showNavigation={false}
          className="countdown-slider"
          lazy={false} // Disable lazy loading for background images
        />
        <div className="countdown-overlay">
          <div className="countdown-gradient"></div>
        </div>
      </div>
      <div className="countdown-content">
        <Parallax speed={-5}>
          <div className="countdown-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="countdown-title">Counting the Days</h2>
              <div className="countdown-display">
                <Countdown />
              </div>
              <button className="save-date-button" style={{ fontFamily: 'Outfit' }}>
                Save the Date
              </button>
            </motion.div>
          </div>
        </Parallax>
      </div>
    </section>
  );
};

export default CountdownSection;