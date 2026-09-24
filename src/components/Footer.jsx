import React from 'react';
import { ArrowUpRight, ArrowUp, Heart, Code2 } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        {/* Massive Editorial Headline */}
        <div className="footer-headline-row">
          <h2 className="footer-headline">
            LET'S BUILD
            <br />
            <span className="text-accent">WHAT'S NEXT.</span>
          </h2>

          <div className="footer-back-to-top">
            <MagneticButton
              onClick={scrollToTop}
              className="back-top-btn"
              cursorText="TOP"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </MagneticButton>
            <span className="back-top-label">BACK TO TOP</span>
          </div>
        </div>

        {/* Mid Row: Info & Socials */}
        <div className="footer-mid-row">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="brand-text">PARMINDER</span>
              <span className="brand-reg">®</span>
            </div>
            <p className="footer-roles">
              Full Stack MERN Developer • UI/UX Designer • Digital Marketer
            </p>
            <p className="footer-bio-snippet">
              Creating digital experiences where engineering, user intuition, and conversion-focused marketing work as one.
            </p>
          </div>

          <div className="footer-links-col">
            <div className="footer-nav-group">
              <div className="group-title">NAVIGATION</div>
              <ul className="footer-nav-list">
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#stack">Tech Stack</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-social-group">
              <div className="group-title">CONNECT</div>
              <ul className="footer-social-list">
                <li>
                  <a
                    href="mailto:parminderkumar42@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-text="MAIL"
                  >
                    <span>Email</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919717237017"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-text="CHAT"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/prince_gagan42/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-text="FOLLOW"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright & Tagline */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © 2026 Parminder. Designed &amp; Developed by Parminder.
          </div>

          <div className="footer-curiosity-pill">
            <Code2 size={13} className="text-accent" />
            <span>MADE WITH CODE + CURIOSITY.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
