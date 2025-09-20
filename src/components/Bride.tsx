import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';

const Bride = () => {
  // Multiple photos of the bride
  const brideImages = [
    '/src/assets/wedding/CLT08607.JPEG',
    '/src/assets/wedding/CLT08512.JPEG',
    '/src/assets/wedding/CLT08365.JPEG'
  ];

  return (
    <section id="bride" className="bride">
      <Parallax speed={30}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bride-content"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="image-with-gradient"
          >
            <ImageSlider
              images={brideImages}
              interval={4000}
              autoplay={true}
              showDots={true}
              aspectRatio="4/5"
              className="featured-slider"
              showNavigation={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="mb-2">The Bride</h2>
            <h3>Avni Cahyaning Asih</h3>
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
