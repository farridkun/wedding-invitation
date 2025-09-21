import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { FaHome, FaRing, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const WeddingEvents = () => {
  const events = [
    {
      id: 'akad',
      title: 'Akad Nikah',
      icon: FaHome,
      date: '9 November 2025',
      day: 'Minggu',
      time: '08:00 - 10:00 WIB',
      timeNote: 'Pagi hari',
      quote: '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."',
      citation: 'QS. Ar-Rum: 21',
      decoration: ''
    },
    {
      id: 'resepsi',
      title: 'Resepsi Pernikahan',
      icon: FaRing,
      date: '9 November 2025',
      day: 'Minggu',
      time: '11:00 - 14:00 WIB',
      timeNote: 'Siang hari',
      quote: '"Makanan yang paling baik adalah makanan yang dimakan oleh banyak orang."',
      citation: 'Hadits Riwayat Bukhari',
      decoration: ''
    }
  ];

  return (
    <section id="wedding-events" className="wedding-events">
      {/* Elegant Background Elements */}
      <div className="events-bg-decoration">
        {/* <div className="bg-ornament ornament-1">✦</div>
        <div className="bg-ornament ornament-2">❀</div>
        <div className="bg-ornament ornament-3">◆</div>
        <div className="bg-ornament ornament-4">♥</div>
        <div className="bg-ornament ornament-5">✦</div>
        <div className="bg-ornament ornament-6">❀</div> */}
      </div>

      <Parallax speed={-10}>
        <div className="events-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="events-header"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="header-icon-wrapper"
            >
              <div className="header-main-icon">
                <FaHeart />
              </div>
              <div className="icon-ring ring-1"></div>
              <div className="icon-ring ring-2"></div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="events-title"
            >
              Acara Pernikahan
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

          {/* Events Grid */}
          <div className="events-grid">
            {events.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 * (index + 1) }}
                  className={`event-card ${event.id}-card`}
                >
                  {/* Event Card Header */}
                  <div className="event-card-header">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 * (index + 1) }}
                      className="event-icon-container"
                    >
                      <div className="event-icon">
                        <IconComponent />
                      </div>
                      <div className="event-decoration-symbol">{event.decoration}</div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 * (index + 1) }}
                      className="event-title"
                    >
                      {event.title}
                    </motion.h3>
                  </div>

                  {/* Event Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 * (index + 1) }}
                    className="event-details"
                  >
                    <div className="detail-row">
                      <div className="detail-icon">
                        <FaCalendarAlt />
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">Tanggal</span>
                        <span className="detail-value">{event.date}</span>
                        <span className="detail-sub">{event.day}</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-icon">
                        <FaClock />
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">Waktu</span>
                        <span className="detail-value">{event.time}</span>
                        <span className="detail-sub">{event.timeNote}</span>
                      </div>
                    </div>

                    <div className="detail-row">
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

                  {/* Event Actions */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 * (index + 1) }}
                    className="event-actions"
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

                  {/* Event Quote */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 * (index + 1) }}
                    className="event-quote"
                  >
                    <blockquote className="quote-text">
                      {event.quote}
                    </blockquote>
                    <cite className="quote-citation">{event.citation}</cite>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Connecting Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="events-connector"
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

export default WeddingEvents;
