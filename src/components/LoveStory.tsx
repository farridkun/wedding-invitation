import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { FaCamera, FaHeart, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

// Curated selection of wedding photos for the love story
const loveStoryImages = [
  '/src/assets/wedding/CLT08105.JPEG',
  '/src/assets/wedding/CLT08124.JPEG',
  '/src/assets/wedding/CLT08143.JPEG',
  '/src/assets/wedding/CLT08173.JPEG',
  '/src/assets/wedding/CLT08211.JPEG',
  '/src/assets/wedding/CLT08255.JPEG',
  '/src/assets/wedding/CLT08360.JPEG',
  '/src/assets/wedding/CLT08388.JPEG',
  '/src/assets/wedding/CLT08440.JPEG',
  '/src/assets/wedding/CLT08526.JPEG'
];

const LoveStory = () => {
  return (
    <section id="lovestory" className="lovestory">
      {/* Elegant Background Elements */}
      <div className="story-bg-decoration">
        <div className="bg-ornament ornament-1">❀</div>
        <div className="bg-ornament ornament-2">♥</div>
        <div className="bg-ornament ornament-3">✦</div>
        <div className="bg-ornament ornament-4">◆</div>
        <div className="bg-ornament ornament-5">❀</div>
        <div className="bg-ornament ornament-6">♥</div>
      </div>

      <Parallax speed={-10}>
        <div className="story-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="story-header"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="header-icon-wrapper"
            >
              <div className="header-main-icon">
                <FaCamera />
              </div>
              <div className="icon-ring ring-1"></div>
              <div className="icon-ring ring-2"></div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="story-title"
            >
              Love Story of Avni & Dea
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="header-divider"
            >
              <div className="divider-line"></div>
              <FaHeart className="divider-heart" />
              <div className="divider-line"></div>
            </motion.div>
          </motion.div>

          {/* Image Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="story-slider-container"
          >
            <ImageSlider
              images={loveStoryImages}
              interval={5000}
              className="story-slider"
            />
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="story-timeline"
          >
            <div className="timeline-item">
              <div className="timeline-marker">
                <FaCalendarAlt />
              </div>
              <div className="timeline-content">
                <h3>Pertemuan Pertama</h3>
                <p>Kisah cinta Dea dan Avni dimulai dari pertemuan yang tak terduga, di mana dua jiwa yang saling melengkapi menemukan satu sama lain.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">
                <FaHeart />
              </div>
              <div className="timeline-content">
                <h3>Percikan Cinta</h3>
                <p>Mereka bertemu di sebuah acara yang penuh kehangatan dan keceriaan, di mana percikan pertama cinta mulai menyala.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">
                <FaMapMarkerAlt />
              </div>
              <div className="timeline-content">
                <h3>Takdir Bersama</h3>
                <p>Setelah beberapa waktu, mereka menyadari bahwa mereka ditakdirkan untuk bersama, menciptakan kenangan indah yang akan dikenang seumur hidup.</p>
              </div>
            </div>
          </motion.div>

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="story-conclusion"
          >
            <div className="conclusion-card">
              <FaHeart className="conclusion-icon" />
              <h3>Hari Bahagia</h3>
              <p>Dan sekarang, mereka mengundang Anda untuk merayakan hari bahagia mereka dalam perjalanan cinta yang penuh berkah!</p>
            </div>
          </motion.div>

          {/* Connecting Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="story-connector"
          >
            <div className="connector-line"></div>
            <div className="connector-heart">
              <FaHeart />
            </div>
            <div className="connector-line"></div>
          </motion.div>
        </div>
      </Parallax>
    </section>
  );
};

export default LoveStory;
