import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { FaBuilding, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaRing } from 'react-icons/fa';

const Resepsi = () => {
  return (
    <section id="resepsi" className="resepsi">
      {/* Floating Decorative Elements */}
      {/* <div className="floating-decoration heart decoration-1">♥</div>
      <div className="floating-decoration flower decoration-2">❀</div>
      <div className="floating-decoration star decoration-3">✦</div>
      <div className="floating-decoration diamond decoration-4">◆</div>
      <div className="floating-decoration heart decoration-5">♥</div> */}

      <Parallax speed={20}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="resepsi-content"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="event-header"
          >
            <div className="event-icon">
              <FaRing />
            </div>
            <h2>Resepsi Pernikahan</h2>
            <div className="event-decoration">
              <FaBuilding className="food-icon" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="event-details"
          >
            <div className="detail-item">
              <div className="detail-icon">
                <FaCalendarAlt />
              </div>
              <div className="detail-content">
                <span className="detail-label">Tanggal</span>
                <span className="detail-value">9 November 2025</span>
                <span className="detail-sub">Minggu</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <FaClock />
              </div>
              <div className="detail-content">
                <span className="detail-label">Waktu</span>
                <span className="detail-value">11:00 - 14:00 WIB</span>
                <span className="detail-sub">Siap siang</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="detail-content">
                <span className="detail-label">Tempat</span>
                <span className="detail-value">PT Inti Persero - Jl. Moch. Toha No.77</span>
                <span className="detail-sub">Cigereleng, Kec. Regol, Kota Bandung</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="event-actions"
          >
            <a href="https://maps.app.goo.gl/NRpg5bx1wUVaBSzN6" target="_blank" rel="noopener noreferrer" className="maps-button">
              <FaMapMarkerAlt />
              Lihat di Google Maps
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="event-quote"
          >
            <blockquote>
              "Makanan yang paling baik adalah makanan yang dimakan oleh banyak orang."
            </blockquote>
            <cite>Hadits Riwayat Bukhari</cite>
          </motion.div>
        </motion.div>
      </Parallax>
    </section>
  );
};

export default Resepsi;
