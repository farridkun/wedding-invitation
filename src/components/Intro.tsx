import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Guest } from '../services/googleSheets';
import backgroundSound from '../assets/background-sound.mp3';
import dividerHorizontal from '../assets/divider-horizontal.png';
import { IoIosMailOpen } from "react-icons/io";

interface IntroProps {
  onOpen: () => void;
  guest: Guest | null;
}

const Intro = ({ onOpen, guest }: IntroProps) => {
  const [isSlidingUp, setIsSlidingUp] = useState(false);

  const handleOpen = () => {
    // Start slide up animation
    setIsSlidingUp(true);
    
    // Play background sound
    const audio = new Audio(backgroundSound);
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(error => {
      console.error('Error playing background sound:', error);
    });

    // Call onOpen after animation completes
    setTimeout(() => {
      onOpen();
    }, 800); // Match the transition duration
  };

  return (
    <div className={`intro-modern ${isSlidingUp ? 'slide-up' : ''}`}>
      {/* Background Overlay */}
      <div className="intro-image-overlay"></div>
      <div className="intro-bottom-gradient"></div>

      {/* Top Content Section */}
      <motion.div
        className="intro-content-top"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Wedding Invitation Text */}
        <motion.p
          className="intro-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontFamily: 'Outfit' }}
        >
          WEDDING INVITATION
        </motion.p>

        {/* Couple Names */}
        <motion.h1
          className="intro-couple-names"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Avni & Dea
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <img
            src={dividerHorizontal}
            alt="Divider"
            className="intro-divider"
          />
        </motion.div>

        {/* Date */}
        <motion.p
          className="intro-date"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ fontFamily: 'Outfit' }}
        >
          09 . 11 . 2025
        </motion.p>
      </motion.div>

      {/* Bottom Content Section */}
      <motion.div
        className="intro-content-modern"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      >

        {/* Guest Name */}
        <motion.div
          className="intro-guest-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <p className="intro-dear">Kepada Yth:</p>
          <p className="intro-guest-name" style={{ fontFamily: 'Outfit' }}>
            {guest && guest.Nama !== 'Guest' ? guest.Nama : 'Tamu Undangan'}
          </p>
        </motion.div>

        {/* Open Invitation Button */}
        <motion.button
          className="intro-open-button"
          onClick={handleOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoIosMailOpen size={24} />
          <p style={{ fontFamily: 'Outfit' }}>
          Buka Undangan
          </p>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Intro;
