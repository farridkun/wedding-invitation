import ParallaxSafe from './ParallaxSafe';
import { motion } from 'framer-motion';

const Quotes = () => {
  return (
    <section id="countdown-section" className="countdown-section">
      <ParallaxSafe speed={20}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="quotes-content"
        >
          <blockquote>
            "pernikahan adalah tanda kebesaran Allah untuk menciptakan ketentraman, cinta, dan kasih sayang antara suami dan istri, yang menjadi dasar bagi kehidupan yang harmonis dan kebahagiaan rumah tangga. "
          </blockquote>
          <cite>- QS Ar-Rum ayat 21</cite>
        </motion.div>
      </ParallaxSafe>
    </section>
  );
};

export default Quotes;
