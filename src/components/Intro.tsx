import { motion } from 'framer-motion';
import type { Guest } from '../services/googleSheets';
import backgroundSound from '../assets/background-sound.mp3';
import { introImages } from '../utils/images';
import avniDeaLogo from '../assets/avni-dea-logo.png';
import dividerHorizontal from '../assets/divider-horizontal.png';

interface IntroProps {
  onOpen: () => void;
  guest: Guest | null;
}

const Intro = ({ onOpen, guest }: IntroProps) => {
  const handleOpen = () => {
    // Play background sound
    const audio = new Audio(backgroundSound);
    audio.loop = true; // Loop the background music
    audio.volume = 0.3; // Set volume to 30%
    audio.play().catch(error => {
      console.error('Error playing background sound:', error);
    });

    // Call the original onOpen function
    onOpen();
  };
  return (
    <div className="intro">
      <div className="intro-background">
        <img
          src={introImages[0]}
          alt="Wedding Background"
          className="intro-bg-image"
        />
        <div className="intro-overlay">
          <div className="intro-gradient"></div>
        </div>
      </div>
      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <img src={avniDeaLogo} alt="AD Logo" style={{
          filter: 'brightness(0) invert(1)',
          width: '180px',
          height: '180px', 
        }} />
        <motion.h3
          style={{
            color: '#fff',
          }}
          className="mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Wedding Invitation
        </motion.h3>
        <motion.h1
          style={{
            color: '#fff',
          }}
          className="font-weight-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          AVNI & DEA
        </motion.h1>
        <motion.p
          style={{
            color: '#fff',
            marginBottom: '12px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          09 . 11 . 2025
        </motion.p>
        <img src={dividerHorizontal} alt="Divider" style={{
          marginTop: '-18px',
        }} />
        <motion.p
          style={{
            color: '#fff',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Kepada Yth:
        </motion.p>
        <motion.p
          style={{ fontSize: '1.4rem', fontWeight: '500', color: '#fff', paddingTop: '8px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {guest && guest.Nama !== 'Guest' ? ` ${guest.Nama}` : 'Tamu Undangan'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
        >
          <div
            onClick={handleOpen}
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              fontSize: '1.2rem',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 400,
              color: '#fff',
              background: 'rgba(249, 243, 239, 0.3)',
              border: '2px solid rgba(249, 243, 239, 0.9)',
              backdropFilter: 'blur(4px)',
              borderRadius: '9999px', // Full pill shape
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginTop: '12px',
            }}
          >
                        <span
              style={{
                fontSize: '1.1rem',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 400,
              }}
            >BUKA UNDANGAN</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Intro;
