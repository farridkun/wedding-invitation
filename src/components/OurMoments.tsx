import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { momentsImages } from '../utils/images';
import { isIOSDevice } from '../utils/device';

const OurMoments = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
    duration: 30
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const isIOS = useMemo(() => isIOSDevice(), []);

  const sectionBackgroundStyle = useMemo(() => ({
    background: `
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 30%),
        linear-gradient(45deg, rgba(255, 255, 255, 0.02) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.02) 75%),
        linear-gradient(-45deg, rgba(255, 255, 255, 0.01) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.01) 75%),
        #f8f8f8
      `,
    backgroundSize: '20px 20px, 30px 30px, 40px 40px, 20px 20px, 20px 20px',
    backgroundAttachment: isIOS ? 'scroll' : 'fixed'
  }), [isIOS]);

  // Autoplay functionality with pause on hover
  useEffect(() => {
    if (!emblaMainApi) return;

    let autoplayInterval: NodeJS.Timeout;

    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        emblaMainApi.scrollNext();
      }, 6000);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    startAutoplay();

    // Pause on hover
    const emblaNode = emblaMainApi.rootNode();
    emblaNode.addEventListener('mouseenter', stopAutoplay);
    emblaNode.addEventListener('mouseleave', startAutoplay);

    return () => {
      stopAutoplay();
      emblaNode.removeEventListener('mouseenter', stopAutoplay);
      emblaNode.removeEventListener('mouseleave', startAutoplay);
    };
  }, [emblaMainApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <section
      id="our-moments"
      className="our-moments"
      style={sectionBackgroundStyle}
    >
      <div className="our-moments-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="moments-header"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="moments-title"
          >
            Our Moments
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="moments-subtitle"
            style={{ fontFamily: 'Outfit', fontSize: '0.8rem' }}
          >
            Constantly, consistently, continually, You.
          </motion.p>
        </motion.div>

        {/* Moments Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="moments-gallery"
        >
          <div className="embla">
            {/* Main Carousel */}
            <div className="embla__viewport" ref={emblaMainRef}>
              <div className="embla__container">
                {momentsImages.map((image, index) => (
                  <div className="embla__slide" key={index}>
                    <div className="embla__slide__inner">
                      <img
                        className="embla__slide__img"
                        src={image}
                        alt={`Moment ${index + 1}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="embla-thumbs">
              <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                <div className="embla-thumbs__container">
                  {momentsImages.map((image, index) => (
                    <div
                      key={index}
                      className={`embla-thumbs__slide ${
                        index === selectedIndex ? 'embla-thumbs__slide--selected' : ''
                      }`}
                    >
                      <button
                        onClick={() => onThumbClick(index)}
                        className="embla-thumbs__slide__button"
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                      >
                        <div className="embla-thumbs__slide__inner">
                          <img
                            className="embla-thumbs__slide__img"
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            loading="lazy"
                          />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMoments;