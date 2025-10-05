import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { bgOvalFrame } from '../utils/images';

interface ImageSliderProps {
  images: string[];
  interval?: number;
  className?: string;
  autoplay?: boolean;
  showDots?: boolean;
  showNavigation?: boolean;
  aspectRatio?: string;
  lazy?: boolean;
  oval?: boolean;
  showThumbnails?: boolean;
}

const ImageSlider = ({
  images,
  interval = 4000,
  className = '',
  autoplay = true,
  showDots = true,
  showNavigation = true,
  aspectRatio = '16/9',
  lazy = true,
  oval = false,
  showThumbnails = false
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // const sliderRef = useRef<HTMLDivElement>(null);

  // Optimized preloading - only preload current and next few images
  useEffect(() => {
    const preloadImages = () => {
      // Preload current image and next 2 images for smooth transitions
      const imagesToPreload = [];
      for (let i = 0; i < Math.min(3, images.length); i++) {
        const imgIndex = (currentIndex + i) % images.length;
        imagesToPreload.push(images[imgIndex]);
      }

      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    if (images.length > 0) {
      preloadImages();
      setIsLoaded(true);
    }
  }, [images, currentIndex]);

  // Auto-slide functionality
  useEffect(() => {
    if (autoplay && isLoaded) {
    // if (autoplay && isLoaded && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, interval, images.length, isLoaded]);

  // Pause on hover/touch
  // const handleMouseEnter = () => setIsPaused(true);
  // const handleMouseLeave = () => setIsPaused(false);

  // Touch handling for mobile
  // const [touchStart, setTouchStart] = useState<number | null>(null);
  // const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // const handleTouchStart = (e: React.TouchEvent) => {
  //   setTouchEnd(null);
  //   setTouchStart(e.targetTouches[0].clientX);
  //   setIsPaused(true); // Pause during touch
  // };

  // const handleTouchMove = (e: React.TouchEvent) => {
  //   setTouchEnd(e.targetTouches[0].clientX);
  // };

  // const handleTouchEnd = () => {
  //   if (!touchStart || !touchEnd) {
  //     setIsPaused(false);
  //     return;
  //   }

  //   const distance = touchStart - touchEnd;
  //   const isLeftSwipe = distance > 50;
  //   const isRightSwipe = distance < -50;

  //   if (isLeftSwipe) {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }
  //   if (isRightSwipe) {
  //     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  //   }

  //   setIsPaused(false);
  // };

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
      className={`beautiful-image-slider ${className} ${oval ? 'oval-frame' : ''}`}
      style={oval ? {
        aspectRatio,
        position: 'relative'
      } : { aspectRatio }}
    >
            <div 
        className="slider-viewport"
        style={oval ? {
          borderRadius: '50%',
          overflow: 'hidden',
          width: '80%',
          height: '80%',
          position: 'absolute',
          top: '10%',
          left: '10%',
          border: '5px solid rgba(7, 31, 93, 0.5)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'rgba(7, 31, 93, 0.3)',
          zIndex: 1,
        } : {}}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transform: index === currentIndex ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              loading={lazy && index > 0 ? 'lazy' : 'eager'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              onLoad={() => {
                if (lazy && index > 0) {
                  setLoadedImages(prev => new Set(prev).add(index));
                }
              }}
              className={lazy && index > 0 && loadedImages.has(index) ? 'loaded' : ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />
            <div className="slide-overlay">
              <div className="elegant-gradient"></div>
            </div>
          </div>
        ))}
      </div>

      {oval && (
        <div
          className="oval-frame-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${bgOvalFrame})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />
      )}

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

      {/* Thumbnail navigation */}
      {showThumbnails && images.length > 1 && (
        <div className="thumbnail-navigation">
          <div className="thumbnail-container">
            {images.map((image, index) => (
              <button
                key={index}
                className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
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
