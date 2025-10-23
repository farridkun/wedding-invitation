import ParallaxSafe from './ParallaxSafe';

const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <ParallaxSafe translateY={[-10, 10]}>
        <h2>Our Story</h2>
      </ParallaxSafe>
      <div className="gallery-grid">
        <ParallaxSafe speed={-10}>
          <div className="gallery-item">
            <img src="https://via.placeholder.com/400x300?text=Photo+1" alt="Photo 1" />
          </div>
        </ParallaxSafe>
        <ParallaxSafe speed={10}>
          <div className="gallery-item">
            <img src="https://via.placeholder.com/400x300?text=Photo+2" alt="Photo 2" />
          </div>
        </ParallaxSafe>
        <ParallaxSafe speed={-10}>
          <div className="gallery-item">
            <img src="https://via.placeholder.com/400x300?text=Photo+3" alt="Photo 3" />
          </div>
        </ParallaxSafe>
      </div>
    </section>
  );
};

export default Gallery;
