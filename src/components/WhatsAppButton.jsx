import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const whatsappUrl =
    'https://wa.me/919717237017?text=Hi%20Parminder,%20I%20would%20like%20to%20discuss%20a%20project';

  return (
    <aside aria-label="Quick contact" className="whatsapp-floating-aside">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        data-cursor-text="CHAT"
        aria-label="Chat with Parminder on WhatsApp"
      >
        <span className="whatsapp-pulse-ring" />
        <MessageCircle size={24} className="whatsapp-icon" />
        <span className="whatsapp-tooltip">Chat with Parminder</span>
      </a>
    </aside>
  );
}
