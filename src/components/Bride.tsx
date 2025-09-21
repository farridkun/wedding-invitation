import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { brideImages } from '../utils/images';

const Bride = () => {
  // Multiple photos of the bride
  const images = brideImages;

  return (
    <section id="bride" className="bride">
      <Parallax speed={30}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bride-content"
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
              className="featured-slider"
              showNavigation={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h2 className="mb-2">The Bride</h2>
            <h3 className="mt-4">Avni Cahyaning Asih</h3>
            <p>Putri dari Bapak Surachman Paryana Apvip & Ibu Nia Kurniasari</p>
            <a href="https://instagram.com/avcahy_" target="_blank" rel="noopener noreferrer" className="instagram-button">
              @avcahy_
            </a>
          </motion.div>
        </motion.div>
      </Parallax>
    </section>
  );
};

export default Bride;
