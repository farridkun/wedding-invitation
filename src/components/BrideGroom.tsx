import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { brideImages, groomImages } from '../utils/images';

const BrideGroom = () => {
  // Multiple photos of the bride and groom
  const brideImagesArray = brideImages;
  const groomImagesArray = groomImages;

  return (
    <section id="bride-groom" className="bride-groom">
      <Parallax speed={25}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bride-groom-content"
        >
          {/* Header Titles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bride-groom-header"
          >
            <h1 className="bride-title">Bride &</h1>
            <h1 className="groom-title">Groom</h1>
          </motion.div>

          {/* Bride and Groom Content */}
          <div className="bride-groom-grid">
            {/* Bride Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="person-section bride-section"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="image-with-gradient"
              >
                <ImageSlider
                  images={brideImagesArray}
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
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3>The Bride</h3>
                <h2>Avni Cahyaning Asih</h2>
                <p>Putri dari Bapak Surachman Paryana Apvip & Ibu Nia Kurniasari</p>
                <a href="https://instagram.com/avcahy_" target="_blank" rel="noopener noreferrer" className="instagram-button">
                  @avcahy_
                </a>
              </motion.div>
            </motion.div>

            {/* Groom Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="person-section groom-section"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="image-with-gradient"
              >
                <ImageSlider
                  images={groomImagesArray}
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
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3>The Groom</h3>
                <h2>Dea Ditawijaya</h2>
                <p>Putra dari Bapak Agus Suratman & Ibu Siti Hodijah (Almh) / Tusmiati</p>
                <a href="https://instagram.com/deaditawijaya" target="_blank" rel="noopener noreferrer" className="instagram-button">
                  @deyaditawijaya
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Parallax>
    </section>
  );
};

export default BrideGroom;