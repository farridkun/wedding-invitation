import { Parallax } from 'react-scroll-parallax';

const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <Parallax translateY={[-10, 10]}>
        <h2>Our Story</h2>
      </Parallax>
      <div className="gallery-grid">
        <Parallax speed={-10}>
          <div className="gallery-item">
            <img src="https://via.placeholder.com/400x300?text=Photo+1" alt="Photo 1" />
          </div>
        </Parallax>
        <Parallax speed={10}>
          <div className="gallery-item">
            <img src="https://via.placeholder.com/400x300?text=Photo+2" alt="Photo 2" />
          </div>
        </Parallax>
        <Parallax speed={-10}>
          <div className="gallery-item">
            <img src="https://via.placeholder.com/400x300?text=Photo+3" alt="Photo 3" />
          </div>
        </Parallax>
      </div>
    </section>
  );
};

export default Gallery;
