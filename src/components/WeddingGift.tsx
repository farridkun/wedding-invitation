import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaCopy, FaTimes } from 'react-icons/fa';
import { IoIosGift } from 'react-icons/io';
import { images } from '../utils/images';

const WeddingGift = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Berhasil menyalin nomor rekening, jangan lupa transfer ya :D');
  };

  return (
    <section id="wedding-gift" className="wedding-gift">
      <Parallax speed={-10}>
        <div className="gift-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="gift-header"
          >
            <div className="gift-icon">
              <IoIosGift />
            </div>
            <h2>Wedding Gift</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="gift-description"
            style={{ fontFamily: 'Outfit' }}
          >
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan hadiah, kami sangat berterima kasih atas perhatiannya.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="gift-toggle-button"
          >
             <IoIosGift style={{ color: '#007FAE' }} />
            <span style={{ fontFamily: 'Outfit', color: '#007FAE' }}>Wedding Gift</span>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="gift-details"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="gift-options"
                >
                  <div className="gift-option">
                    <div className="option-header">
                      <div className="option-icon">
                        <FaCreditCard />
                      </div>
                      <h3 style={{ color: '#1a365d', fontFamily: 'Outfit', fontWeight: 500 }}>Transfer BCA</h3>
                    </div>
                    <div className="option-content">
                      <div className="account-info-container" onClick={() => copyToClipboard('3370224811')}>
                        <p className="account-info">
                          <span className="account-number">3370224811</span><br />
                          <span className="account-name" style={{ fontFamily: 'Outfit' }}>a.n Dea Ditawijaya</span>
                        </p>
                        <FaCopy className="copy-icon" />
                      </div>
                    </div>
                  </div>

                  <div className="gift-option">
                    <div className="option-header">
                      <div className="option-icon">
                        <FaCreditCard />
                      </div>
                      <h3 style={{ color: '#1a365d', fontFamily: 'Outfit', fontWeight: 500 }}>Transfer Mandiri</h3>
                    </div>
                    <div className="option-content">
                      <div className="account-info-container" onClick={() => copyToClipboard('1320025316697')}>
                        <p className="account-info">
                          <span className="account-number">1320025316697</span><br />
                          <span className="account-name" style={{ fontFamily: 'Outfit' }}>a.n Avni Cahyaning Asih</span>
                        </p>
                        <FaCopy className="copy-icon" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Parallax>

      <AnimatePresence>
        {showQRModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="qr-modal-overlay"
            onClick={() => setShowQRModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="qr-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal"
                onClick={() => setShowQRModal(false)}
              >
                <FaTimes />
              </button>
              <h3>Scan QR Code</h3>
              <div className="qr-modal-content">
                <div className="large-qr-code">
                  <img src={images.qr.gopay} alt="QR Code for payment" />
                </div>
                <p>Scan kode QR ini untuk mentransfer dengan mudah</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WeddingGift;
