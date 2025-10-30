import { useState, useEffect, useMemo } from 'react';
import ParallaxSafe from './ParallaxSafe';
import { motion } from 'framer-motion';
import { sheetsService } from '../services/googleSheets';
import type { Guest, Ucapan } from '../services/googleSheets';
import { FaHeart, FaEnvelope, FaPaperPlane, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { isIOSDevice } from '../utils/device';

interface WishesProps {
  guest: Guest | null;
}

const WISHES_PER_PAGE = 5;

const Wishes = ({ guest }: WishesProps) => {
  const [wishes, setWishes] = useState<Ucapan[]>([]);
  const [attendance, setAttendance] = useState<'hadir' | 'tidak'>('hadir');
  const [newWish, setNewWish] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const isIOS = useMemo(() => isIOSDevice(), []);

  const sectionBackgroundStyle = useMemo(() => ({
    background: `
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 30%),
        linear-gradient(45deg, rgba(255, 255, 255, 0.02) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.02) 75%),
        linear-gradient(-45deg, rgba(255, 255, 255, 0.01) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.01) 75%),
        #f8f8f8
      `,
    backgroundSize: '20px 20px, 30px 30px, 40px 40px, 20px 20px, 20px 20px',
    backgroundAttachment: isIOS ? 'scroll' : 'fixed'
  }), [isIOS]);

  useEffect(() => {
    loadWishes();
    if (guest) {
      // Pre-fill the sender name with guest name, but allow editing
      setSenderName(guest.Nama);
      if (guest.Kehadiran === 'hadir') {
        setAttendance('hadir');
      } else if (guest.Kehadiran === 'tidak') {
        setAttendance('tidak');
      }
    }
  }, [guest]);

  const loadWishes = async () => {
    const allUcapan = await sheetsService.getAllUcapan();
    setWishes(allUcapan);
  };

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim() || !senderName.trim()) {
      alert('Mohon isi nama dan ucapan Anda');
      return;
    }

    setIsSubmitting(true);

    try {
      let success = false;

      if (guest) {
        // If guest from link, update their attendance in Guests sheet
        success = await sheetsService.updateGuestAttendanceOnly(guest.Nama, attendance);
        
        if (!success) {
          alert('Gagal mengupdate kehadiran. Silakan coba lagi.');
          setIsSubmitting(false);
          return;
        }
      }

      // Add ucapan to Ucapan sheet with sender's name (editable)
      success = await sheetsService.addUcapan(senderName.trim(), newWish.trim());

      if (success) {
        await loadWishes();
        setNewWish('');
        if (!guest) {
          // Only clear name if not a guest (guests might want to keep their name)
          setSenderName('');
        }
        setCurrentPage(1);
      } else {
        console.error('Failed to submit wish');
        alert('Gagal mengirim ucapan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Failed to submit wish:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(wishes.length / WISHES_PER_PAGE);
  const startIndex = (currentPage - 1) * WISHES_PER_PAGE;
  const endIndex = startIndex + WISHES_PER_PAGE;
  const currentWishes = wishes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="wishes" className="wishes" style={sectionBackgroundStyle}>
      {/* Elegant Background Elements */}
      <div className="wishes-bg-decoration">
      </div>

    <ParallaxSafe speed={-10}>
        <div className="wishes-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="wishes-header"
          >
            {/* <motion.div
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
            </motion.div> */}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="wishes-title"
            >
              RSVP & Ucapan
            </motion.h2>

          {/* <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="header-divider"
          >
            <div className="divider-line"></div>
            <FaEnvelope className="divider-heart" />
            <div className="divider-line"></div>
          </motion.div> */}
          </motion.div>

          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="wishes-description"
          >
            Berikan ucapan dan doa terbaik untuk Avni & Dea
          </motion.p> */}

          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmitResponse}
            className="wish-form"
          >
            {/* Name field - always editable */}
            <div className="form-group" style={{ marginBottom: '10px' }}>
              <label style={{ fontFamily: 'Outfit', fontWeight: 400 }}>Nama *</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Masukkan nama..."
                required
                style={{ fontFamily: 'Outfit' }}
              />
            </div>

            {/* Attendance options - only for guests with link */}
            {guest && (
              <div className="form-group">
                <label style={{ fontFamily: 'Outfit', fontWeight: 400 }}>Konfirmasi Kehadiran:</label>
                <div className="attendance-options">
                  <label className="attendance-option">
                    <input
                      type="radio"
                      value="hadir"
                      checked={attendance === 'hadir'}
                      onChange={(e) => setAttendance(e.target.value as 'hadir')}
                    />
                    <div className="option-content">
                      <span style={{ fontFamily: 'Outfit' }}>Hadir</span>
                    </div>
                  </label>
                  <label className="attendance-option">
                    <input
                      type="radio"
                      value="tidak"
                      checked={attendance === 'tidak'}
                      onChange={(e) => setAttendance(e.target.value as 'tidak')}
                    />
                    <div className="option-content">
                      <span style={{ fontFamily: 'Outfit' }}>Tidak Hadir</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Message field */}
            <div className="form-group">
              <label style={{ fontFamily: 'Outfit', fontWeight: 400 }}>Ucapan & Doa *</label>
              <textarea
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="Tulis ucapan dan doa..."
                required
                rows={4}
                style={{ fontFamily: 'Outfit' }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-wish-button"
              style={{ fontFamily: 'Outfit' }}
            >
              <FaPaperPlane className="button-icon" />
              {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
            </button>
          </motion.form>          <motion.div
            className="wishes-list"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 style={{ fontFamily: 'Outfit' }}>Ucapan yang Diterima ({wishes.length})</h3>
            {currentWishes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="no-wishes-card"
              >
                <div className="no-wishes-icon">
                  <FaEnvelope />
                </div>
                <h4 style={{ fontFamily: 'Outfit' }}>Belum ada ucapan</h4>
                <p style={{ fontFamily: 'Outfit' }}>Jadilah yang pertama memberikan ucapan dan doa untuk Avni & Dea!</p>
              </motion.div>
            ) : (
              <>
                <div className="wishes-list-simple">
                  {currentWishes.map((wish, index) => (
                    <motion.div
                      key={wish._id || `wish-${startIndex + index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="wish-item-simple"
                    >
                      <div className="wish-item-content">
                        <div className="wish-author-simple">
                          <FaHeart className="wish-heart-icon" />
                          <strong>{wish.Nama}</strong>
                          <span className="wish-number-simple" style={{ fontFamily: 'Outfit' }}>#{index + 1}</span>
                        </div>
                        <p className="wish-message-simple" style={{ fontFamily: 'Outfit' }}>{wish.Ucapan}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="wishes-pagination"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-button"
                    >
                      <FaChevronLeft />
                      <span style={{ fontFamily: 'Outfit' }}>Sebelumnya</span>
                    </button>

                    <div className="pagination-info">
                      <span className="current-page" style={{ fontFamily: 'Outfit' }}>{currentPage}</span>
                      <span className="total-pages" style={{ fontFamily: 'Outfit' }}>dari {totalPages}</span>
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-button"
                    >
                      <span style={{ fontFamily: 'Outfit' }}>Selanjutnya</span>
                      <FaChevronRight />
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          {/* Connecting Element */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="wishes-connector"
          >
            <div className="connector-line"></div>
            <div className="connector-heart">
              <FaHeart />
            </div>
            <div className="connector-line"></div>
          </motion.div> */}
        </div>
    </ParallaxSafe>
    </section>
  );
};

export default Wishes;
