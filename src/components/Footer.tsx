import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Decorative Elements */}
      {/* <div className="footer-decoration decoration-1">❀</div>
      <div className="footer-decoration decoration-2">♥</div>
      <div className="footer-decoration decoration-3">✦</div> */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>Terima kasih atas kehadiran dan doa restu Anda</p>
        <p>Avni & Dea</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
