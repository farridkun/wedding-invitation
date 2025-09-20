import { Parallax } from 'react-scroll-parallax';

const AkadNikah = () => {
  return (
    <section id="akad" className="akad">
      <Parallax translateX={[10, -10]}>
        <div className="akad-content">
          <h2>Akad Nikah</h2>
          <p><strong>Tanggal:</strong> 9 November 2025</p>
          <p><strong>Hari:</strong> Minggu</p>
          <p><strong>Waktu:</strong> 08:00 WIB</p>
          <p><strong>Tempat:</strong> PT Inti Bandung</p>
          <a href="https://maps.google.com/?q=PT+Inti+Bandung" target="_blank" rel="noopener noreferrer" className="maps-button">
            Lihat di Google Maps
          </a>
        </div>
      </Parallax>
    </section>
  );
};

export default AkadNikah;
