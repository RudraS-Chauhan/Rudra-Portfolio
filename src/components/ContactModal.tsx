import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { SEO } from './SEO';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', projectType: '3D Modeling', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', projectType: '3D Modeling', message: '' });
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#111111] border-2 border-[#D7E2EA]/20 rounded-[30px] p-6 sm:p-8 text-[#D7E2EA] z-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#B600A8]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#D7E2EA] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#B600A8]/20 border border-[#B600A8] flex items-center justify-center text-[#B600A8]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight">Message Sent!</h3>
                <p className="text-sm text-[#D7E2EA]/70 max-w-xs">
                  Thanks for reaching out. Rudra will review your project details and get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#B600A8]" />
                  <span className="text-xs uppercase font-medium tracking-widest text-[#B600A8]">
                    Start a Project
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6">
                  Let&apos;s Create Together
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#D7E2EA]/70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Rivera"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#D7E2EA]/70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#D7E2EA]/70 mb-1.5">
                      Service Type
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] transition-colors cursor-pointer"
                    >
                      <option value="3D Modeling">3D Modeling</option>
                      <option value="Rendering">Photorealistic Rendering</option>
                      <option value="Motion Design">Motion Design & Animation</option>
                      <option value="Branding">3D Brand Identity</option>
                      <option value="Web Design">Web Design & Experience</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#D7E2EA]/70 mb-1.5">
                      Project Details
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about your goals, timeline, and deliverables..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 font-medium uppercase tracking-widest text-white rounded-full py-3.5 px-6 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      outline: '2px solid white',
                      outlineOffset: '-3px',
                    }}
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
