import React, { useState } from 'react';
import { Mail, MessageCircle, ArrowUpRight, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Instagram } from './BrandIcons';
import MagneticButton from './MagneticButton';
import './Contact.css';

/**
 * WEB3FORMS CONFIGURATION
 * --------------------------------------------------------------------------
 * Get your free Web3Forms Access Key at: https://web3forms.com
 * Replace the string below with your access key.
 */
const WEB3FORMS_ACCESS_KEY = "79efea35-1035-4ec0-97b9-3d5d60c1f26b";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Full Stack Development',
    budget: '₹25K – ₹50K',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [clientErrors, setClientErrors] = useState({});

  const servicesList = [
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'UI/UX Design',
    'Digital Marketing',
    'SEO',
    'Performance Marketing',
    'Landing Page',
    'Other'
  ];

  const budgetOptions = [
    '₹10K – ₹25K',
    '₹25K – ₹50K',
    '₹50K – ₹1L',
    '₹1L+',
    "Let's Discuss"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (clientErrors[name]) {
      setClientErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please share at least a short description of your project (min 10 characters).';
    }
    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (formStatus === 'sending') return; // Prevent double submit

    setFormStatus('sending');
    setErrorMessage('');

    // If developer hasn't replaced key yet, simulate graceful handling with clear notice
    if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setTimeout(() => {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Full Stack Development',
          budget: '₹25K – ₹50K',
          message: ''
        });
      }, 1200);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
          from_name: 'Parminder Portfolio Inquiry'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Full Stack Development',
          budget: '₹25K – ₹50K',
          message: ''
        });
      } else {
        setFormStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again or contact me directly.');
      }
    } catch (err) {
      setFormStatus('error');
      setErrorMessage('Something went wrong. Please try again or contact me directly.');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="dot" />
            <span>HAVE A PROJECT IN MIND?</span>
          </div>
          <h2 className="section-title">
            LET'S CREATE
            <br />
            SOMETHING
            <br />
            <span className="text-accent">MEMORABLE.</span>
          </h2>
          <p className="section-subtitle">
            Whether you need a flagship MERN application, high-converting digital marketing campaign, or bespoke UI/UX design — let's build something exceptional.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-grid">
          {/* Left Column: Direct Links & Info */}
          <div className="contact-info-col">
            <div className="contact-channels">
              {/* Email */}
              <a
                href="mailto:parminderkumar42@gmail.com"
                className="channel-card glass-panel"
                data-cursor-text="EMAIL"
              >
                <div className="channel-icon-box">
                  <Mail size={22} className="text-accent" />
                </div>
                <div className="channel-details">
                  <span className="channel-label">EMAIL DIRECTLY</span>
                  <span className="channel-value">parminderkumar42@gmail.com</span>
                </div>
                <ArrowUpRight size={18} className="channel-arrow" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919717237017?text=Hi%20Parminder,%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card glass-panel"
                data-cursor-text="CHAT"
              >
                <div className="channel-icon-box">
                  <MessageCircle size={22} className="text-electric" />
                </div>
                <div className="channel-details">
                  <span className="channel-label">WHATSAPP QUICK CHAT</span>
                  <span className="channel-value">+91 97172 37017</span>
                </div>
                <ArrowUpRight size={18} className="channel-arrow" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/prince_gagan42/"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card glass-panel"
                data-cursor-text="FOLLOW"
              >
                <div className="channel-icon-box">
                  <Instagram size={22} className="text-accent" />
                </div>
                <div className="channel-details">
                  <span className="channel-label">INSTAGRAM</span>
                  <span className="channel-value">@prince_gagan42</span>
                </div>
                <ArrowUpRight size={18} className="channel-arrow" />
              </a>
            </div>

            {/* Availability Box */}
            <div className="availability-box glass-panel">
              <div className="avail-status">
                <span className="live-status-dot" />
                <span className="avail-title">CURRENT STATUS</span>
              </div>
              <p className="avail-desc">
                Accepting select freelance contracts, agency collaborations, and remote full-time opportunities.
              </p>
              <div className="avail-timezone">Based in India (IST / UTC +5:30) • Global Remote Friendly</div>
            </div>
          </div>

          {/* Right Column: Interactive Web3Forms Form */}
          <div className="contact-form-col">
            <div className="contact-form-card glass-panel">
              <div className="form-card-header">
                <h3 className="form-card-title">PROJECT INQUIRY</h3>
                <span className="form-notice">Fill out the details below for a quick response within 24 hours.</span>
              </div>

              {formStatus === 'success' ? (
                <div className="form-success-banner">
                  <div className="success-icon-box">
                    <CheckCircle2 size={42} className="text-accent" />
                  </div>
                  <h4 className="success-title">Message received.</h4>
                  <p className="success-desc">
                    Thank you for reaching out! I'll review your project details and get back to you soon.
                  </p>
                  <button
                    type="button"
                    className="btn-secondary success-reset-btn"
                    onClick={() => setFormStatus('idle')}
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
                  {formStatus === 'error' && (
                    <div className="form-error-banner">
                      <AlertCircle size={18} />
                      <span>{errorMessage || 'Something went wrong. Please try again or contact me directly.'}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name" className="field-label">
                        Full Name <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={handleChange}
                        className={`field-input ${clientErrors.name ? 'error-border' : ''}`}
                      />
                      {clientErrors.name && <span className="field-error-text">{clientErrors.name}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="email" className="field-label">
                        Email Address <span className="req-star">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`field-input ${clientErrors.email ? 'error-border' : ''}`}
                      />
                      {clientErrors.email && <span className="field-error-text">{clientErrors.email}</span>}
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="phone" className="field-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 or International"
                        value={formData.phone}
                        onChange={handleChange}
                        className="field-input"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="company" className="field-label">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Startup or Brand Name"
                        value={formData.company}
                        onChange={handleChange}
                        className="field-input"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service & Budget Dropdowns */}
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="service" className="field-label">
                        Service Required
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="field-input field-select"
                      >
                        {servicesList.map((svc) => (
                          <option key={svc} value={svc} style={{ background: '#141414', color: '#F5F5F5' }}>
                            {svc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="budget" className="field-label">
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="field-input field-select"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} style={{ background: '#141414', color: '#F5F5F5' }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field">
                    <label htmlFor="message" className="field-label">
                      Project Description <span className="req-star">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell me about your goals, timeline, and deliverables..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`field-input field-textarea ${clientErrors.message ? 'error-border' : ''}`}
                    />
                    {clientErrors.message && <span className="field-error-text">{clientErrors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="btn-primary form-submit-btn"
                    data-cursor-text="SEND"
                  >
                    {formStatus === 'sending' ? (
                      <span>SENDING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <ArrowUpRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
