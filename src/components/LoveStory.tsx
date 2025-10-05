import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { FaHeart } from '../utils/icons';

const LoveStory = () => {
  return (
    <section id="lovestory" className="lovestory">
      <Parallax speed={-10}>
        <div className="story-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="story-header"
          >
            {/* <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
              className="header-icon-wrapper"
            >
              <div className="header-main-icon">
                <FaHeart />
              </div>
              <div className="icon-ring ring-1"></div>
              <div className="icon-ring ring-2"></div>
            </motion.div> */}

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="story-title-head"
            >
              Our Love Story
            </motion.h3>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="story-title"
            >
              Avni & Dea
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="header-divider"
            >
              <div className="divider-line"></div>
              <FaHeart className="divider-heart" />
              <div className="divider-line"></div>
            </motion.div>
          </motion.div>

          {/* Love Story Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="story-content"
          >
            <div className="story-text">
              <p>
                Kisah kami berawal dari sebuah perkenalan sederhana yang dijembatani oleh seorang teman. Siapa sangka, perkenalan yang awalnya terasa sederhana justru menjadi awal dari cerita terindah dalam hidup kami.
              </p>

              <p>
                Beberapa waktu setelah itu, kami pun memutuskan untuk bertemu langsung untuk pertama kalinya. Suasananya begitu santai namun romantis penuh tawa ringan, obrolan hangat, dan rasa nyaman yang sulit dijelaskan.
              </p>

              <p>
                Pertemuan demi pertemuan berikutnya pun berjalan begitu alami. Rasa saling suka tumbuh perlahan, tanpa paksaan, hanya dengan kejujuran dan perhatian kecil yang membuat segalanya terasa begitu berarti. Hingga akhirnya, dengan penuh keyakinan dan cinta, kami memutuskan untuk melangkah ke jenjang yang lebih serius menuju pernikahan.
              </p>

              <p>
                Kini, kami siap menulis babak baru dari kisah yang dimulai dengan satu perkenalan sederhana, menjadi kisah cinta seumur hidup.
              </p>
            </div>
          </motion.div>
        </div>
      </Parallax>
    </section>
  );
};

export default LoveStory;
