import { Quote } from 'lucide-react';

export default function Testimonials() {
  const items = [
    {
      quote: "Cleanexit helped us pass our ISO 27001 audit effortlessly.",
      author: "IT Manager, SecureNet Pvt Ltd",
    },
    {
      quote: "We wiped hundreds of devices in a week with full documentation.",
      author: "Head of Ops, DataForge Inc.",
    },
    {
      quote: "Exactly what we needed for GDPR and HIPAA compliance.",
      author: "CISO, MediCore Health",
    },
  ];

  return (
    <section aria-labelledby="testimonials-title" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 id="testimonials-title" className="font-heading text-3xl font-semibold text-slate-900 sm:text-4xl">
            Trusted by teams everywhere
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Over 500 companies already trust Cleanexit to protect their digital footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <figure key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <Quote className="h-6 w-6 text-brand-600" />
              <blockquote className="mt-4 text-slate-700">{t.quote}</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-slate-500">{t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
