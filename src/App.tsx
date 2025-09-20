import { useState, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from './components/Intro';
import Hero from './components/Hero';
import Bride from './components/Bride';
import Groom from './components/Groom';
import Quotes from './components/Quotes';
import WeddingEvents from './components/WeddingEvents';
import RSVP from './components/RSVP';
// import WeddingGift from './components/WeddingGift';
import LoveStory from './components/LoveStory';
import Wishes from './components/Wishes';
import Footer from './components/Footer';
import ScrollButton from './components/ScrollButton';
import { sheetsService } from './services/googleSheets';
import type { Guest } from './services/googleSheets';
import './styles/app.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeGuest = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const guestName = urlParams.get('guest');

      if (guestName) {
        const decodedGuestName = decodeURIComponent(guestName);
        try {
          const guestData = await sheetsService.getGuestByName(decodedGuestName);
          if (guestData) {
            setGuest(guestData);
          } else {
            setGuest({
              No: 0,
              Nama: 'Guest',
              Kehadiran: 'pending'
            });
          }
        } catch (error) {
          setGuest({
            No: 0,
            Nama: 'Guest',
            Kehadiran: 'pending'
          });
        }
      } else {
        setGuest({
          No: 0,
          Nama: 'Guest',
          Kehadiran: 'pending'
        });
      }
      setLoading(false);
    };

    initializeGuest();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (loading) {
    return (
      <div className="intro" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <ParallaxProvider>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Intro onOpen={handleOpen} guest={guest} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="app"
          >
            <Hero guest={guest} />
            <Bride />
            <Groom />
            <Quotes />
            <WeddingEvents />
            {/* <WeddingGift /> */}
            <RSVP guest={guest} />
            <LoveStory />
            <Wishes guest={guest} />
            <Footer />
            <ScrollButton />
          </motion.div>
        )}
      </AnimatePresence>
    </ParallaxProvider>
  );
}

export default App;
