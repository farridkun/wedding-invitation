import { useState, useEffect, lazy, Suspense } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from './components/Intro';
import Hero from './components/Hero';
import ScrollButton from './components/ScrollButton';
import AdminGuestLinks from './pages/AdminGuestLinks';
// import NavigatorMenu from './components/NavigatorMenu';
import { sheetsService } from './services/googleSheets';
import type { Guest } from './services/googleSheets';
import avniDeaLogo from './assets/avni-dea-logo.png';
import './styles/app.css';

// Lazy load heavy components for better performance
const BrideGroomIntro = lazy(() => import('./components/BrideGroomIntro'));
const BrideGroom = lazy(() => import('./components/BrideGroom'));
const WeddingEvents = lazy(() => import('./components/WeddingEvents'));
// const LoveStory = lazy(() => import('./components/LoveStory'));
const OurMoments = lazy(() => import('./components/OurMoments'));
const CountdownSection = lazy(() => import('./components/CountdownSection'));
// const Wishes = lazy(() => import('./components/Wishes'));
const Footer = lazy(() => import('./components/Footer'));
// const WeddingGift = lazy(() => import('./components/WeddingGift'));

// Loading component for Suspense fallback
const LoadingSpinner = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="loading-spinner"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <motion.img
        src={avniDeaLogo}
        alt="Avni & Dea Logo"
        className="loading-logo"
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        style={{
          width: '180px',
          height: '180px',
          filter: 'brightness(0) invert(1)',
        }}
      />
      <motion.div
        style={{ marginTop: '-24px' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      >
        <div
          style={{ marginTop: '8px', color: '#fff', fontSize: '1.2rem', letterSpacing: '2px', textAlign: 'center', fontFamily: 'Outfit' }}
        >
          Loading{dots}
        </div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if accessing admin page
  const isAdminPage = window.location.pathname === '/admin-secret-links' || 
                      window.location.pathname === '/admin-secret-links/';

  useEffect(() => {
    const initializeGuest = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const guestName = urlParams.get('guest');
      const untukName = urlParams.get('untuk');

      // Add minimum 2-second loading delay
      const startTime = Date.now();

      if (untukName) {
        // Direct guest name from 'untuk' parameter - bypass spreadsheet
        const decodedUntukName = decodeURIComponent(untukName);
        setGuest({
          No: 0,
          Nama: decodedUntukName,
          Kehadiran: 'pending'
        });
      } else if (guestName) {
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
          console.error('Error fetching guest data:', error);
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

      const elapsedTime = Date.now() - startTime;
      const remainingDelay = Math.max(0, 3000 - elapsedTime);

      setTimeout(() => {
        setLoading(false);
      }, remainingDelay);
    };

    initializeGuest();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  // Show admin page if accessing admin route
  if (isAdminPage) {
    return <AdminGuestLinks />;
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <LoadingSpinner />
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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
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
            <Suspense fallback={<LoadingSpinner />}>
              <BrideGroomIntro />
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
              <BrideGroom />
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
              <WeddingEvents />
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
              <CountdownSection />
            </Suspense>
            {/* <Suspense fallback={<LoadingSpinner />}>
              <LoveStory />
            </Suspense> */}
            <Suspense fallback={<LoadingSpinner />}>
              <OurMoments />
            </Suspense>
            {/* <Suspense fallback={<LoadingSpinner />}>
              <WeddingGift />
            </Suspense> */}
            {/* <Suspense fallback={<LoadingSpinner />}>
              <Wishes guest={guest} />
            </Suspense> */}
            <Suspense fallback={<LoadingSpinner />}>
              <Footer />
            </Suspense>
            <ScrollButton />
            {/* <NavigatorMenu /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </ParallaxProvider>
  );
}

export default App;
