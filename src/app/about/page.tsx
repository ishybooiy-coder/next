export const metadata = {
  title: "About — LUX",
  description: "The story behind LUX Atelier.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85&auto=format&fit=crop"
          alt="Atelier"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/30" />
        <div className="relative mx-auto max-w-7xl h-full flex flex-col justify-end pb-16 px-6 lg:px-10">
          <p className="text-cream/80 tracking-[0.2em] uppercase text-sm mb-5">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-cream max-w-3xl leading-[1.05]">
            A quiet rebellion against the disposable.
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="font-serif text-2xl leading-relaxed text-charcoal">
            LUX began with a simple question: what if we surrounded ourselves
            with fewer, better things — made to last generations, not seasons?
          </p>
          <div className="mt-10 space-y-6 text-warm-gray leading-relaxed">
            <p>
              Founded in 2018 by a pair of former architects, LUX is a curation
              of furniture and home objects made by independent ateliers across
              Europe and Japan. We travel to meet our makers, walk their
              workshops, and share the stories behind each piece.
            </p>
            <p>
              Every item in our collection is chosen for its integrity of
              materials, its honesty of construction, and its ability to grow
              more beautiful with use. We believe furniture is not decoration —
              it is the quiet stage on which daily life unfolds.
            </p>
            <p>
              We work directly with makers, pay fair wages, and publish our
              margins. Transparency is not a marketing exercise for us; it is
              how we sleep at night.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-ivory" id="sustainability">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Made to Last",
              body: "Every piece is warrantied for ten years. Many of our makers have been practicing their craft for decades, some for centuries.",
            },
            {
              title: "Responsible Materials",
              body: "We favor FSC-certified hardwoods, natural fibers, and vegetable-tanned leathers. No MDF. No veneers pretending to be solid wood.",
            },
            {
              title: "Repairable by Design",
              body: "Our makers stand behind their work — and we'll help you find them if a piece ever needs care, even decades from now.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-serif text-2xl text-charcoal mb-3">
                {item.title}
              </h3>
              <p className="text-warm-gray leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24" id="trade">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4">
            For Designers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            The Trade Program
          </h2>
          <p className="mt-6 text-warm-gray max-w-2xl mx-auto leading-relaxed">
            Qualified interior designers and architects receive 20% off the
            entire collection, dedicated project support, and priority access to
            new arrivals.
          </p>
          <a
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 bg-charcoal text-cream px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-gold transition-colors"
          >
            Apply for Trade
          </a>
        </div>
      </section>
    </>
  );
}
