import { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { sheetsService } from '../services/googleSheets';
import type { Guest } from '../services/googleSheets';
import { FaUser, FaCalendarCheck, FaEnvelope, FaPaperPlane, FaHeart, FaCheckCircle } from 'react-icons/fa';

interface RSVPProps {
  guest: Guest | null;
}

const RSVP = ({ guest }: RSVPProps) => {
  const [status, setStatus] = useState<'hadir' | 'tidak'>('hadir');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (guest) {
      // Pre-fill with existing data if available
      if (guest.Kehadiran === 'hadir') {
        setStatus('hadir');
      } else if (guest.Kehadiran === 'tidak') {
        setStatus('tidak');
      }
    }
  }, [guest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guest) return;

    setIsSubmitting(true);

    // Update guest attendance in guests sheet
    const success = await sheetsService.updateGuestAttendance(guest.Nama, status);

    if (success) {
      setIsSubmitted(true);
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="rsvp">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rsvp-content"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rsvp-success-header"
          >
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h2>Terima Kasih!</h2>
            <div className="success-decoration">
              <FaHeart className="heart-icon" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rsvp-success-message"
          >
            RSVP Anda telah berhasil dikirim.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="rsvp-summary"
          >
            <div className="summary-item">
              <FaUser className="summary-icon" />
              <div className="summary-content">
                <span className="summary-label">Nama:</span>
                <span className="summary-value">{guest?.Nama}</span>
              </div>
            </div>
            <div className="summary-item">
              <FaCalendarCheck className="summary-icon" />
              <div className="summary-content">
                <span className="summary-label">Kehadiran:</span>
                <span className="summary-value">{status === 'hadir' ? 'Akan Hadir' : 'Tidak Hadir'}</span>
              </div>
            </div>
            {/* {status === 'hadir' && (
              <div className="summary-item">
                <FaUsers className="summary-icon" />
                <div className="summary-content">
                  <span className="summary-label">Jumlah Tamu:</span>
                  <span className="summary-value">{guestCount}</span>
                </div>
              </div>
            )} */}
            {message && (
              <div className="summary-item">
                <FaEnvelope className="summary-icon" />
                <div className="summary-content">
                  <span className="summary-label">Pesan:</span>
                  <span className="summary-value">{message}</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="rsvp">
      <Parallax speed={-15}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="rsvp-container"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rsvp-header"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              className="header-icon-wrapper"
            >
              <div className="header-main-icon">
                <FaPaperPlane />
              </div>
              <div className="icon-ring ring-1"></div>
              <div className="icon-ring ring-2"></div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="rsvp-title"
            >
              RSVP
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="header-divider"
            >
              <div className="divider-line"></div>
              <FaHeart className="divider-heart" />
              <div className="divider-line"></div>
            </motion.div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="rsvp-card"
          >
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="rsvp-description"
            >
              Dengan senang hati kami mengundang Anda untuk menjadi bagian dari hari spesial kami
            </motion.p>

            {/* Form Section */}
            {guest ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="rsvp-form"
              >
                {/* Guest Name Display */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="form-field"
                >
                  <label className="field-label">
                    <FaUser className="field-icon" />
                    <span>Nama Tamu</span>
                  </label>
                  <div className="guest-name-display">{guest.Nama}</div>
                </motion.div>

                {/* Attendance Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 2 }}
                  className="form-field"
                >
                  <label className="field-label">
                    <FaCalendarCheck className="field-icon" />
                    <span>Konfirmasi Kehadiran</span>
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'hadir' | 'tidak')}
                    required
                    className="elegant-select"
                  >
                    <option value="hadir">Ya, Saya Akan Hadir</option>
                    <option value="tidak">Maaf, Saya Tidak Dapat Hadir</option>
                  </select>
                </motion.div>

                {/* Optional Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 2.2 }}
                  className="form-field"
                >
                  <label className="field-label">
                    <FaEnvelope className="field-icon" />
                    <span>Pesan (Opsional)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tulis doa restu atau pesan khusus..."
                    rows={3}
                    className="elegant-textarea"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="elegant-submit-button"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.4 }}
                >
                  <FaPaperPlane className="button-icon" />
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}</span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="rsvp-placeholder"
              >
                <FaEnvelope className="placeholder-icon" />
                <h3>Undangan Pribadi</h3>
                <p>Silakan gunakan link undangan yang telah dikirim untuk mengisi RSVP</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </Parallax>
    </section>
  );
};

export default RSVP;
