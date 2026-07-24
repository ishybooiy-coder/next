"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
            Get in touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal">
            We'd love to hear from you
          </h1>
          <p className="mt-5 text-warm-gray max-w-xl mx-auto">
            Questions about a piece, the collection, or a project? Our team
            responds within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-4">
              <Mail size={20} className="text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-warm-gray">
                  Email
                </p>
                <a
                  href="mailto:concierge@lux-atelier.com"
                  className="font-serif text-lg hover:text-gold transition-colors"
                >
                  concierge@lux-atelier.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone size={20} className="text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-warm-gray">
                  Phone
                </p>
                <a
                  href="tel:+12125550142"
                  className="font-serif text-lg hover:text-gold transition-colors"
                >
                  +1 (212) 555-0142
                </a>
                <p className="text-xs text-warm-gray mt-1">
                  Monday–Friday, 10am–6pm ET
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin size={20} className="text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-warm-gray">
                  Atelier
                </p>
                <p className="font-serif text-lg leading-snug">
                  142 Crosby Street<br />
                  New York, NY 10012
                </p>
                <p className="text-xs text-warm-gray mt-1">
                  By appointment only
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-sand">
              <p className="text-xs tracking-[0.15em] uppercase text-warm-gray mb-4">
                Follow
              </p>
              <div className="flex gap-5">
                {["Instagram", "Pinterest", "1stDibs"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-sm text-charcoal hover:text-gold transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-ivory p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-gold text-cream rounded-full flex items-center justify-center">
                  ✓
                </div>
                <h2 className="font-serif text-3xl mt-6">Thank you</h2>
                <p className="mt-3 text-warm-gray">
                  Your message is on its way. We'll be in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm underline hover:text-gold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-warm-gray block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-sand-dark pb-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-warm-gray block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-sand-dark pb-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-warm-gray block mb-2">
                    Topic
                  </label>
                  <select
                    required
                    className="w-full bg-transparent border-b border-sand-dark pb-3 focus:outline-none focus:border-gold transition-colors cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option>General Inquiry</option>
                    <option>Product Question</option>
                    <option>Order Status</option>
                    <option>Trade Program Application</option>
                    <option>Press</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-warm-gray block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-sand-dark pb-3 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-charcoal text-cream py-4 text-sm tracking-[0.15em] uppercase hover:bg-gold transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
