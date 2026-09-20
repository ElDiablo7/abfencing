"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-white/95 py-5"
      }`}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center z-50">
          <Image
            src="/logo.svg"
            alt="AB Fencing"
            width={140}
            height={52}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+447539490180"
            className="flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden lg:inline">07539 490 180</span>
          </a>
          <Link href="/quote" className="btn-primary py-2 px-5 text-sm">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 p-2 text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-white pt-24 px-6 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-heading font-semibold text-charcoal border-b border-gray-100 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-4">
              <a
                href="tel:+447539490180"
                className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-xl text-primary font-bold text-lg"
              >
                <Phone className="w-5 h-5" />
                Call Scott
              </a>
              <Link
                href="/quote"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-lg py-4"
              >
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
