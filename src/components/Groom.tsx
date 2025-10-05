import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { groomImages } from '../utils/images';

const Groom = () => {
  // Multiple photos of the groom
  const images = groomImages;

  return (
    <section id="groom" className="groom">
      <Parallax speed={-20}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="groom-content"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="image-with-gradient"
          >
            <ImageSlider
              images={images}
              interval={4000}
              autoplay={true}
              showDots={false}
              aspectRatio="4/5"
              showNavigation={false}
              oval={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h2 className="mb-2">The Groom</h2>
            <h3 className="mt-4">Dea Ditawijaya</h3>
            <p>Putra dari Bapak Agus Suratman & Ibu Siti Hodijah (Almh) / Tusmiati</p>
            <a href="https://instagram.com/deaditawijaya" target="_blank" rel="noopener noreferrer" className="instagram-button">
              @deyaditawijaya
            </a>
          </motion.div>
        </motion.div>
      </Parallax>
    </section>
  );
};

export default Groom;
