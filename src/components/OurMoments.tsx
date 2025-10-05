import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { momentsImages } from '../utils/images';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  return (
    <section id="our-moments" className="our-moments">
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

            {/* Navigation Buttons */}
            <button
              className="embla__button embla__button--prev"
              onClick={scrollPrev}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button
              className="embla__button embla__button--next"
              onClick={scrollNext}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>

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