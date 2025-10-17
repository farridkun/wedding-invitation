import { motion } from 'framer-motion';
import avniDeaLogo from '../assets/avni-dea-logo.png';

const BrideGroomIntro = () => {
  return (
    <section id="bride-groom-intro" className="bride-groom-intro">
      <div className="bride-groom-intro-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={avniDeaLogo}
            alt="Avni & Dea Logo"
            style={{
              width: '160px',
              height: '160px',
              filter: 'brightness(0) invert(1)',
              marginBottom: '-4px',
            }}
          />
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bride-groom-quote"
        >
          <blockquote>
            Pernikahan adalah tanda kebesaran Allah untuk menciptakan ketentraman, cinta, dan kasih sayang antara suami dan istri, yang menjadi dasar bagi kehidupan yang harmonis dan kebahagiaan rumah tangga. 
          </blockquote>
          <cite>- QS Ar-Rum ayat 21 -</cite>
        </motion.div>
      </div>
    </section>
  );
};

export default BrideGroomIntro;