import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — LUX",
  description: "Answers to common questions about LUX.",
};

const sections = [
  {
    id: "orders",
    title: "Orders & Shipping",
    qas: [
      {
        q: "How long does delivery take?",
        a: "Most in-stock pieces ship within 5-10 business days. Made-to-order items (noted on the product page) take 6-12 weeks. You'll receive tracking details by email as soon as your order leaves the atelier.",
      },
      {
        q: "Do you offer white-glove delivery?",
        a: "Yes. On all orders over $1,500, delivery includes unboxing, assembly, placement in your room of choice, and removal of all packaging. Our team coordinates a two-hour delivery window with you directly.",
      },
      {
        q: "Do you ship internationally?",
        a: "We ship to the continental US, Canada, UK, EU, and Japan. International shipping rates and timelines are calculated at checkout. For other destinations, please contact us.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    qas: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery on most items in their original condition. Made-to-order and personalized pieces are final sale. Contact us at concierge@lux-atelier.com to arrange a pickup.",
      },
      {
        q: "Are returns free?",
        a: "Return shipping is complimentary on orders over $1,500. For smaller orders, a flat $75 pickup fee is deducted from the refund.",
      },
    ],
  },
  {
    id: "care",
    title: "Product Care",
    qas: [
      {
        q: "How do I care for upholstered furniture?",
        a: "We recommend professional cleaning every 18-24 months. For everyday care, vacuum with a soft brush attachment and keep pieces out of direct sunlight. Each piece ships with detailed care instructions.",
      },
      {
        q: "Will solid wood furniture change over time?",
        a: "Yes — and beautifully. Solid wood darkens gently with age and exposure to light. We include care wax annually for the first three years as part of our ownership program.",
      },
    ],
  },
  {
    id: "trade",
    title: "Trade Program",
    qas: [
      {
        q: "Who qualifies for the trade program?",
        a: "Licensed interior designers, architects, and stagers in good standing. We verify credentials upon application and provide a dedicated trade liaison.",
      },
      {
        q: "What benefits do trade members receive?",
        a: "20% off the full collection, priority production timelines, complimentary finish samples, and a dedicated project manager for large orders.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
            Help
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal">
            Frequently Asked
          </h1>
          <p className="mt-5 text-warm-gray max-w-xl mx-auto">
            Answers to the questions we hear most. Can't find what you're
            looking for?{" "}
            <a href="/contact" className="underline hover:text-gold">
              Reach out
            </a>
            .
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="font-serif text-3xl text-charcoal mb-6 pb-3 border-b border-sand">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.qas.map(({ q, a }) => (
                  <details
                    key={q}
                    className="group bg-ivory rounded-sm open:bg-cream"
                  >
                    <summary className="flex justify-between items-center cursor-pointer p-6 list-none">
                      <span className="font-serif text-xl text-charcoal pr-4">
                        {q}
                      </span>
                      <span className="text-gold text-xl transition-transform group-open:rotate-45 flex-shrink-0">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-warm-gray leading-relaxed">
                      {a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
