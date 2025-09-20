import { Parallax } from 'react-scroll-parallax';

const About = () => {
  return (
    <section id="about" className="about">
      <Parallax translateX={[-10, 10]}>
        <div className="about-content">
          <h2>About Us</h2>
          <p>We are excited to celebrate our love with you...</p>
        </div>
      </Parallax>
    </section>
  );
};

export default About;
