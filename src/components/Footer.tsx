import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-400 py-16 px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <h2 className="text-white text-4xl font-bold">RE-SIFT</h2>
          <p className="text-gray-500">
            Discover the future of job searching with AI-powered tools designed to get you noticed and hired.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="space-y-4"
        >
          <h3 className="text-white text-2xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            {['About Us', 'Features', 'Pricing', 'FAQs', 'Contact Us'].map((link, index) => (
              <li key={index} className="hover:text-white transition-colors cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="space-y-4"
        >
          <h3 className="text-white text-2xl font-semibold">Resources</h3>
          <ul className="space-y-2">
            {['Blog', 'Guides', 'Support', 'Careers', 'Privacy Policy'].map((resource, index) => (
              <li key={index} className="hover:text-white transition-colors cursor-pointer">
                {resource}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="space-y-4"
        >
          <h3 className="text-white text-2xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Icon size={28} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500"
      >
        <p>&copy; {new Date().getFullYear()} RE-SIFT. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
