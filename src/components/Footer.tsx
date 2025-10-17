import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { backgroundFooter, backgroundFooter2 } from '../utils/images';

const Footer = () => {
  const footerImages = [backgroundFooter, backgroundFooter2];

  return (
    <footer className="footer">
      <div className="footer-background">
        <ImageSlider
          images={footerImages}
          interval={5000}
          className="footer-slider"
          autoplay={true}
          showDots={false}
          showNavigation={false}
          lazy={true}
          oval={false}
        />
      </div>
      <div className="footer-overlay"></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="footer-content"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="footer-title"
        >
          Thank You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="footer-message"
          style={{ fontFamily: 'Outfit' }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan do'a restunya untuk keberkahan pernikahan kami.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="footer-thanks"
          style={{ fontFamily: 'Outfit' }}
        >
          Atas doa dan restunya, kami ucapkan terima kasih.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="footer-names"
        >
          <span>Avni & Dea</span>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
