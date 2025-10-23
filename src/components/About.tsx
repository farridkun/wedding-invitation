import ParallaxSafe from './ParallaxSafe';

const About = () => {
  return (
    <section id="about" className="about">
      <ParallaxSafe translateX={[-10, 10]}>
        <div className="about-content">
          <h2>About Us</h2>
          <p>We are excited to celebrate our love with you...</p>
        </div>
      </ParallaxSafe>
    </section>
  );
};

export default About;
