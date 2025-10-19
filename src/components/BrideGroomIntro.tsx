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
            Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          </blockquote>
          <cite>- QS Ar-Rum ayat 21 -</cite>
        </motion.div>
      </div>
    </section>
  );
};

export default BrideGroomIntro;