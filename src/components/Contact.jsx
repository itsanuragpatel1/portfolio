import React, { useState, useEffect } from 'react';
import { Calendar, Send, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => 
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields before sending.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xykayqya', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setError(data.errors.map((err) => err.message).join(', '));
        } else {
          setError('Oops! There was a problem submitting your form.');
        }
      }
    } catch (err) {
      setError('Oops! There was a network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 px-6 md:px-12 bg-transparent transition-colors duration-300 scroll-mt-28">
      <div className="max-w-2xl mx-auto">

        {/* Section Header */}
        <h2 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-8 text-center">
          Let's Collaborate
        </h2>

        {/* Contact Form */}
        <div className="w-full">
          {isSubmitted ? (
            <div className="p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/20 dark:bg-neutral-900/10 rounded-2xl flex flex-col items-center text-center animate-fade-in shadow-sm">
              <h3 className="text-lg font-sans font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
                Message sent successfully
              </h3>
              <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mb-6 leading-relaxed">
                Thank you for reaching out. Your message has been received, and Anurag will get back to you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-bold tracking-wider px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 rounded-lg transition-all shadow-sm cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 border border-rose-200 bg-rose-50/10 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-lg">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="group bg-neutral-50/25 dark:bg-neutral-900/10 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 transition-colors focus-within:border-neutral-400 dark:focus-within:border-neutral-700">
                <label htmlFor="name" className="block text-[8px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-0.5 select-none">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="off"
                  className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600"
                />
              </div>

              {/* Email */}
              <div className="group bg-neutral-50/25 dark:bg-neutral-900/10 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 transition-colors focus-within:border-neutral-400 dark:focus-within:border-neutral-700">
                <label htmlFor="email" className="block text-[8px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-0.5 select-none">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  autoComplete="off"
                  className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600"
                />
              </div>

              {/* Message */}
              <div className="group bg-neutral-50/25 dark:bg-neutral-900/10 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 transition-colors focus-within:border-neutral-400 dark:focus-within:border-neutral-700">
                <label htmlFor="message" className="block text-[8px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-0.5 select-none">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or inquiry..."
                  className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 px-6 py-3 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    Sending
                    <Loader2 size={13} className="animate-spin text-neutral-400 dark:text-neutral-600" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 dark:border-neutral-900 my-12" />

        {/* Let's Talk CTA */}
        <div className="text-center bg-neutral-50/40 dark:bg-neutral-900/10 border border-neutral-200 dark:border-neutral-800/80 p-6 md:p-8 rounded-2xl shadow-sm">
          <h3 className="text-lg font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            Prefer a Call?
          </h3>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md mx-auto mb-6">
           Pick a time slot that fits your schedule, and let’s build something impactful together.
          </p>
          <button
            data-cal-link="itsanuragpatel/15min"
            data-cal-config={JSON.stringify({
              layout: "month_view",
              theme: isDarkMode ? "dark" : "light"
            })}
            className="inline-flex items-center gap-2 font-sans text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-6 py-3 rounded-lg transition-all shadow-sm cursor-pointer"
          >
            <Calendar size={13} />
            Schedule Call
          </button>
        </div>

      </div>
    </section>
  );
}
