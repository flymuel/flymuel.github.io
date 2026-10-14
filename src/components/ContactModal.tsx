import React, { useState } from 'react';
import { FaCheck, FaPaperPlane } from 'react-icons/fa';
import { MdEmail, MdClose } from 'react-icons/md';
import { aeroAudio } from '../utils/audio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const email = 'christophersamuel887@gmail.com';

  const handleCopy = () => {
    aeroAudio.playWaterClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Fungsi handleSubmit menggunakan Formspree
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    aeroAudio.playGlassChime();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xaeqdaer', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        alert('An error occurred while sending the message. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('Failed to connect to the server.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/40 backdrop-blur-md animate-fadeIn">
      <div className="aero-glass-panel max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border-2 border-white">
        <div className="glass-reflection" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-cyan-400 via-sky-300 to-white flex items-center justify-center shadow-md border border-white">
                <MdEmail className="w-4 h-4 text-sky-900" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-sky-950 tracking-tight">
                  Connect with Samuel
                </h3>
                <p className="text-xs text-sky-800/80">Software Engineering & Opportunities</p>
              </div>
            </div>

            <button
              onClick={() => {
                aeroAudio.playWaterClick();
                onClose();
              }}
              className="p-1.5 rounded-full bg-white/80 border border-sky-200 text-sky-900 hover:bg-white transition-colors cursor-pointer"
              title="Close"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Copy Email Box */}
          <div className="p-3.5 rounded-xl bg-white/70 border border-white shadow-inner mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] uppercase font-bold text-sky-800/70 block">
                  Direct Email
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-sky-950 truncate select-all">
                  {email}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="btn-gel-silver px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-sm"
              title="Copy Email Address"
            >
              <div className="gel-highlight" />
              {copied ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 mx-auto flex items-center justify-center mb-3">
                <FaCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-base font-extrabold text-emerald-950 mb-1">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-emerald-800 mb-4">
                Thank you for reaching out! Your message has been sent successfully to my email.
              </p>
              <button
                onClick={handleReset}
                className="btn-gel-green px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                <div className="gel-highlight" />
                <span>Close Window</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-sky-900 block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Jane Doe"
                  className="w-full px-3 py-2 rounded-xl bg-white/80 border border-sky-200/80 focus:outline-none focus:ring-2 focus:ring-sky-400 text-xs sm:text-sm font-medium text-sky-950 placeholder-sky-900/40 shadow-inner"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-sky-900 block mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. jane@company.com"
                  className="w-full px-3 py-2 rounded-xl bg-white/80 border border-sky-200/80 focus:outline-none focus:ring-2 focus:ring-sky-400 text-xs sm:text-sm font-medium text-sky-950 placeholder-sky-900/40 shadow-inner"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-sky-900 block mb-1">
                  Message / Project Brief
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="Describe your engineering inquiry, project, or role..."
                  className="w-full px-3 py-2 rounded-xl bg-white/80 border border-sky-200/80 focus:outline-none focus:ring-2 focus:ring-sky-400 text-xs sm:text-sm font-medium text-sky-950 placeholder-sky-900/40 shadow-inner resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    aeroAudio.playWaterClick();
                    onClose();
                  }}
                  className="btn-gel-silver px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <div className="gel-highlight" />
                  <span>Cancel</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gel-aqua px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <div className="gel-highlight" />
                  <FaPaperPlane className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};