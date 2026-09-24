import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Stack', href: '#stack' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check current active section
      const sections = ['hero', 'about', 'projects', 'services', 'stack', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -60, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="navbar-container glass-panel">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="navbar-brand"
            data-cursor-text="PK"
            aria-label="Parminder Home"
          >
            <span className="brand-primary">PARMINDER</span>
            <span className="brand-dot">®</span>
          </a>

          {/* Desktop Links */}
          <div className="navbar-links">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  data-cursor-text="GO"
                >
                  {link.name}
                  {isActive && <span className="nav-active-indicator" />}
                </a>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="navbar-actions">
            <MagneticButton
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="navbar-cta-btn"
              cursorText="TALK"
              strength={0.25}
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={15} className="cta-arrow" />
            </MagneticButton>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              data-cursor-text="MENU"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <div className="navbar-brand">
              <span className="brand-primary">PARMINDER</span>
              <span className="brand-dot">®</span>
            </div>
            <button
              type="button"
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation"
            >
              <X size={28} />
            </button>
          </div>

          <div className="mobile-links-list">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`mobile-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <span className="mobile-link-num">0{idx + 1}</span>
                <span className="mobile-link-text">{link.name}</span>
                <ArrowUpRight size={20} className="mobile-link-arrow" />
              </a>
            ))}
          </div>

          <div className="mobile-nav-footer">
            <p className="mobile-cta-text">Available for freelance & international projects</p>
            <a
              href="mailto:parminderkumar42@gmail.com"
              className="mobile-email-link"
            >
              parminderkumar42@gmail.com
            </a>
            <div className="mobile-socials">
              <a href="https://www.instagram.com/prince_gagan42/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              <a href="https://wa.me/919717237017" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
