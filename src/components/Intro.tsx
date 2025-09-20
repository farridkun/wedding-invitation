import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import type { Guest } from '../services/googleSheets';
import backgroundSound from '../assets/background-sound.mp3';
import { introImages } from '../utils/images';

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
        <div className="intro-decoration-top"></div>
        <motion.h3
          style={{
            color: '#fff',
          }}
          className="mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          The Wedding of
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
          Avni & Dea
        </motion.h1>
        <div className="intro-decoration-middle"></div>
        <motion.p
          style={{
            color: '#fff',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Kepada Yth Bapak/Ibu/Saudara/i:
        </motion.p>
        <motion.p
          style={{ fontSize: '1.4rem', fontWeight: '500', color: '#fff' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {guest && guest.Nama !== 'Guest' ? ` ${guest.Nama}` : ''}
        </motion.p>
        <div className="intro-decoration-bottom"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
        >
          <Button onClick={handleOpen} className="open-button">
            <span>Buka Undangan</span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Intro;
