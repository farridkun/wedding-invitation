import { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { sheetsService } from '../services/googleSheets';
import type { Guest, Wish } from '../services/googleSheets';
import { FaHeart, FaEnvelope, FaPaperPlane, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface WishesProps {
  guest: Guest | null;
}

const WISHES_PER_PAGE = 5;

const Wishes = ({ guest }: WishesProps) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    const allWishes = await sheetsService.getAllWishes();
    setWishes(allWishes);
  };

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim() || !guest) return;

    setIsSubmitting(true);
    const wishData: Omit<Wish, 'No'> = {
      Nama: guest.Nama,
      Ucapan: newWish.trim(),
    };

    const success = await sheetsService.addWish(wishData);
    if (success) {
      loadWishes(); // Reload wishes after adding new one
      setNewWish('');
      setShowForm(false);
      setCurrentPage(1); // Reset to first page when new wish is added
    }
    setIsSubmitting(false);
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
    <section id="wishes" className="wishes">
      {/* Elegant Background Elements */}
      <div className="wishes-bg-decoration">
        <div className="bg-ornament ornament-1">❀</div>
        <div className="bg-ornament ornament-2">♥</div>
        <div className="bg-ornament ornament-3">✦</div>
        <div className="bg-ornament ornament-4">◆</div>
        <div className="bg-ornament ornament-5">❀</div>
        <div className="bg-ornament ornament-6">♥</div>
      </div>

      <Parallax speed={-10}>
        <div className="wishes-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="wishes-header"
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
              className="wishes-title"
            >
              Ucapan & Doa
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="header-divider"
            >
              <div className="divider-line"></div>
              <FaEnvelope className="divider-heart" />
              <div className="divider-line"></div>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="wishes-description"
          >
            Berikan ucapan dan doa terbaik untuk Avni & Dea
          </motion.p>

          {guest && (
            <motion.div
              className="wishes-actions"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button
                onClick={() => setShowForm(!showForm)}
                className="wish-button"
              >
                {showForm ? 'Batal' : 'Kirim Ucapan'}{""}
                <FaPaperPlane className="button-icon" />
              </button>
            </motion.div>
          )}

          {showForm && guest && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmitWish}
              className="wish-form"
            >
              <div className="form-group">
                <label>Dari: <strong>{guest.Nama}</strong></label>
              </div>
              <div className="form-group">
                <textarea
                  value={newWish}
                  onChange={(e) => setNewWish(e.target.value)}
                  placeholder="Tulis ucapan dan doa Anda..."
                  required
                  rows={4}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-wish-button"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
              </button>
            </motion.form>
          )}

          <motion.div
            className="wishes-list"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3>Ucapan yang Diterima ({wishes.length})</h3>
            {currentWishes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="no-wishes-card"
              >
                <div className="no-wishes-icon">
                  <FaEnvelope />
                </div>
                <h4>Belum ada ucapan</h4>
                <p>Jadilah yang pertama memberikan ucapan dan doa untuk Avni & Dea!</p>
              </motion.div>
            ) : (
              <>
                <div className="wishes-grid">
                  {currentWishes.map((wish, index) => (
                    <motion.div
                      key={wish.No}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="wish-card"
                    >
                      <div className="wish-card-header">
                        <div className="wish-avatar">
                          <FaHeart />
                        </div>
                        <div className="wish-author">
                          <strong>{wish.Nama}</strong>
                        </div>
                        <div className="wish-decoration">
                          <FaHeart />
                        </div>
                      </div>
                      <div className="wish-card-content">
                        <p className="wish-message">{wish.Ucapan}</p>
                      </div>
                      <div className="wish-card-footer">
                        <div className="wish-number">#{wish.No}</div>
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
                      <span>Sebelumnya</span>
                    </button>

                    <div className="pagination-info">
                      <span className="current-page">{currentPage}</span>
                      <span className="total-pages">dari {totalPages}</span>
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-button"
                    >
                      <span>Selanjutnya</span>
                      <FaChevronRight />
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          {/* Connecting Element */}
          <motion.div
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
          </motion.div>
        </div>
      </Parallax>
    </section>
  );
};

export default Wishes;
