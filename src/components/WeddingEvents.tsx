import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { GiLinkedRings } from 'react-icons/gi';
import { PiCheersFill } from 'react-icons/pi';
import leafBackground1 from '../assets/wedding/leaf-background-1.png';
import leafBackground2 from '../assets/wedding/leaf-background-2.png';
import { backgroundWeddingEvent } from '../utils/images';

const WeddingEvents = () => {
  return (
    <section 
      id="wedding-events" 
      className="wedding-events"
      style={{
        backgroundImage: `url(${backgroundWeddingEvent})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Decorative Leaves */}
      <img 
        src={leafBackground1} 
        alt="Decorative Leaf" 
        className="decorative-leaf leaf-left-top" 
      />
      <img 
        src={leafBackground2} 
        alt="Decorative Leaf" 
        className="decorative-leaf leaf-right-bottom" 
      />
      
      <Parallax speed={-10}>
        <div className="events-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="events-header"
          >
            <h2 className="events-title mb-2">Acara Pernikahan</h2>
            <p>Acara InsyaAllah akan dilaksanakan pada</p>
          </motion.div>

          {/* Events List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="events-list"
          >
            {/* Tanggal & Hari */}
            <div className="event-item">
              <div>
                <h2 className="mt-2 nautical-font">Minggu</h2>
              </div>
              <div className="event-content">
                <h2 className="event-name">9 November 2025</h2>
              </div>
            </div>

            {/* Akad Nikah */}
            <div className="event-item">
              <div className="event-icon">
                <GiLinkedRings
                  size={48}
                />
              </div>
              <div className="event-content">
                <h3 className="event-name">Akad Nikah</h3>
                <p className="event-time">Pukul 08:00 - 10:00 WIB</p>
              </div>
            </div>

            {/* Resepsi */}
            <div className="event-item">
              <div className="event-icon">
                <PiCheersFill size={48} />
              </div>
              <div className="event-content">
                <h3 className="event-name">Resepsi</h3>
                <p className="event-time">Pukul 11:00 - 14:00 WIB</p>
              </div>
            </div>

            {/* Location */}
            <div className="event-item">
              <div className="event-icon">
                <FaMapLocationDot size={48} />
              </div>
              <div className="event-content">
                <h3 className="event-name">Bertempat di</h3>
                <p className="event-location">PT Inti Persero - Jl. Moch. Toha No.77</p>
                <p className="event-location-sub">Cigereleng, Kec. Regol, Kota Bandung</p>
              </div>
            </div>
          </motion.div>

          {/* Google Maps Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="maps-button-container"
          >
            <a
              href="https://maps.app.goo.gl/NRpg5bx1wUVaBSzN6"
              target="_blank"
              rel="noopener noreferrer"
              className="maps-button"
            >
              <FaMapMarkerAlt />
              <span>Lihat di Google Maps</span>
            </a>
          </motion.div>
        </div>
      </Parallax>
    </section>
  );
};

export default WeddingEvents;
