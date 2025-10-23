import ParallaxSafe from './ParallaxSafe';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { brideImages, groomImages } from '../utils/images';
import { isIOSDevice } from '../utils/device';

const BrideGroom = () => {
  // Multiple photos of the bride and groom
  const brideImagesArray = brideImages;
  const groomImagesArray = groomImages;

  return (
    <section id="bride-groom" className="bride-groom">
      <ParallaxSafe speed={25}>
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
            style={
              isIOSDevice() ? {
                marginTop: '2rem'
              } : {}
            }
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
                // style={{
                //   position: 'relative',
                //   background: 'linear-gradient(to top, rgba(0, 127, 174, 0.8) 0%, rgba(0, 127, 174, 0.4) 50%, transparent 100%)'
                // }}
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
                <h1 style={{
                  fontFamily: 'The Nautigal',
                  position: 'absolute',
                  bottom: '50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                  zIndex: 10,
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Avni
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3>The Bride</h3>
                <h2 style={{ fontFamily: 'The Nautigal', fontSize: '2.8rem', fontWeight: 700  }}>Avni Cahyaning Asih</h2>
                <p style={{ fontFamily: 'Outfit', marginBottom: '-0.2rem' }}>Putri dari</p>
                <p style={{ fontFamily: 'Outfit' }}>Bapak Surachman Paryana Apvip</p>
                <p style={{ fontFamily: 'Outfit', marginTop: '-1.5rem' }}>&</p>
                <p style={{ fontFamily: 'Outfit', marginTop: '-1.5rem' }}>Ibu Nia Kurniasari</p>
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
                // style={{
                //   position: 'relative',
                //   background: 'linear-gradient(to top, rgba(0, 127, 174, 0.8) 0%, rgba(0, 127, 174, 0.4) 50%, transparent 100%)'
                // }}
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
                <h1 style={{
                  fontFamily: 'The Nautigal',
                  position: 'absolute',
                  bottom: '50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                  zIndex: 10,
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Dea
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={
              isIOSDevice() ? {
                marginBottom: '2rem'
              } : {}
                }
              >
                <h3>The Groom</h3>
                <h2 style={{ fontFamily: 'The Nautigal', fontSize: '2.8rem', fontWeight: 700  }}>Dea Ditawijaya</h2>
                <p style={{ fontFamily: 'Outfit', marginBottom: '-0.2rem' }}>Putra dari</p>
                <p style={{ fontFamily: 'Outfit' }}>Bapak Agus Suratman</p>
                <p style={{ fontFamily: 'Outfit', marginTop: '-1.5rem' }}>&</p>
                <p style={{ fontFamily: 'Outfit', marginTop: '-1.5rem' }}>Ibu Siti Hodijah (Almh) / Tusmiati</p>
                <a href="https://instagram.com/deyaditawijaya" target="_blank" rel="noopener noreferrer" className="instagram-button">
                  @deyaditawijaya
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </ParallaxSafe>
    </section>
  );
};

export default BrideGroom;