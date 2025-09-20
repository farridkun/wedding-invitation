import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageSliderProps {
  images: string[];
  interval?: number;
  className?: string;
  autoplay?: boolean;
  showDots?: boolean;
  showNavigation?: boolean;
  aspectRatio?: string;
}

const ImageSlider = ({
  images,
  interval = 4000,
  className = '',
  autoplay = true,
  showDots = true,
  showNavigation = true,
  aspectRatio = '16/9'
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Preload images
  useEffect(() => {
    const preloadImages = images.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(preloadImages).then(() => {
      setIsLoaded(true);
    });
  }, [images]);

  // Auto-slide functionality
  useEffect(() => {
    if (autoplay && isLoaded && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, interval, images.length, isLoaded, isPaused]);

  // Pause on hover/touch
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true); // Pause during touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }

    setIsPaused(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!isLoaded) {
    return (
      <div className={`beautiful-image-slider-loading ${className}`} style={{ aspectRatio }}>
        <div className="elegant-loading-spinner">
          <div className="elegant-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`beautiful-image-slider ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
      style={{ aspectRatio }}
    >
      <div className="slider-viewport">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image})`,
              opacity: index === currentIndex ? 1 : 0,
              transform: index === currentIndex ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="slide-overlay">
              <div className="elegant-gradient"></div>
            </div>
          </div>
        ))}
      </div>

      {showDots && images.length > 1 && (
        <div className="elegant-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`elegant-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows for desktop */}
      {images.length > 1 && showNavigation && (
        <>
          <button
            className="slider-nav prev"
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="slider-nav next"
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
    </motion.div>
  );
};

export default ImageSlider;
