import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGift, FaCreditCard, FaMapMarkerAlt, FaQrcode, FaCopy, FaHeart, FaTimes, FaExpand } from 'react-icons/fa';

const WeddingGift = () => {
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
            transition={{ duration: 0.8, delay: 0.4 }}
            className="gift-header"
          >
            <div className="gift-icon">
              <FaGift />
            </div>
            <h2>Wedding Gift</h2>
            <div className="gift-decoration">
              <FaHeart className="heart-icon" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="gift-description"
          >
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan hadiah, kami sangat berterima kasih atas perhatiannya.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="gift-options"
          >
            <div className="gift-option">
              <div className="option-header">
                <div className="option-icon">
                  <FaCreditCard />
                </div>
                <h3>Transfer BCA</h3>
              </div>
              <div className="option-content">
                <p className="account-info">3370224811 a.n Dea Ditawijaya</p>
                <button onClick={() => copyToClipboard('3370224811')} className="copy-button">
                  <FaCopy /> Copy Nomor Rekening
                </button>
              </div>
            </div>

            <div className="gift-option">
              <div className="option-header">
                <div className="option-icon">
                  <FaCreditCard />
                </div>
                <h3>Transfer Mandiri</h3>
              </div>
              <div className="option-content">
                <p className="account-info">1320025316697 a.n Avni Cahyaning Asih</p>
                <button onClick={() => copyToClipboard('1320025316697')} className="copy-button">
                  <FaCopy /> Copy Nomor Rekening
                </button>
              </div>
            </div>

            <div className="gift-option">
              <div className="option-header">
                <div className="option-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>Alamat Kirim Kado</h3>
              </div>
              <div className="option-content">
                <p className="account-info">
                  Jl. Raya Bogor KM 47, Cibinong, Bogor<br />
                  RT 01 RW 01, Desa Cibinong<br />
                  Kecamatan Cibinong, Kabupaten Bogor<br />
                  Jawa Barat 16911
                </p>
              </div>
            </div>

            <div className="gift-option qr-option">
              <div className="option-header">
                <div className="option-icon">
                  <FaQrcode />
                </div>
                <h3>QR Code</h3>
              </div>
              <div className="option-content">
                <div className="qr-placeholder" onClick={() => setShowQRModal(true)}>
                  <div className="qr-code">
                    <FaQrcode size={48} />
                  </div>
                  <button className="expand-button">
                    <FaExpand className="expand-icon" />
                    Klik untuk memperbesar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
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
                  <img src="/src/assets/qr-gopay-dea.png" alt="QR Code for payment" />
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
