import { useState } from "react";
import ShimmerButton from "./ui/shimmer-button";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-opacity-25 bg-black shadow-md transition-all duration-300 rounded-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="text-2xl font-extrabold text-white hover:text-gray-300 transition duration-300">
              <span className="bg-clip-text text-transparent bg-white">
                RE-SIFT
              </span>
            </a>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {["Home", "Pricing", "Docs", "Use Cases"].map((link, index) => (
              <a
                key={index}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
              >
                {link}
              </a>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="hidden md:flex space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105">
              Login
            </Button>
            <ShimmerButton className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                Unlock Full Potential
              </span>
            </ShimmerButton>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden text-white hover:text-gray-300 transition duration-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-2 space-y-2 bg-black bg-opacity-50 p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {["Home", "Pricing", "Docs", "Use Cases"].map((link, index) => (
                <motion.a
                  key={index}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="block text-white text-lg font-medium hover:text-gray-300 transition duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {link}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ShimmerButton className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                    Unlock Full Potential
                  </span>
                </ShimmerButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
