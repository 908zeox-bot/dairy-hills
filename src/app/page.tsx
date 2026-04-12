export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dairy Hills</h1>
            <p className="text-gray-400 text-sm mt-0.5">323 S Pearl St · Denver, CO 80209</p>
          </div>
          <a href="mailto:manager@dairy-hills.com" className="text-sm text-gray-300 hover:text-white transition">
            Contact
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-stone-50 px-8 py-20 border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">Washington Park West · Denver</p>
          <h2 className="text-4xl font-light text-gray-800 mb-5 leading-snug">
            Boutique co-working space<br />for wellness &amp; wellness-adjacent professionals.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Dairy Hills is a boutique shared professional workspace at 323 S Pearl Street in Denver&apos;s desirable
            Washington Park West neighborhood. Thoughtfully renovated, quietly located, and home to a curated
            community of health and wellness practitioners.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <a
              href="mailto:manager@dairy-hills.com?subject=Suite%20Inquiry"
              className="inline-block bg-gray-900 text-white text-sm px-6 py-3 rounded hover:bg-gray-700 transition"
            >
              Inquire About Availability
            </a>
            <a
              href="#tenants"
              className="inline-block border border-gray-300 text-gray-700 text-sm px-6 py-3 rounded hover:border-gray-500 transition"
            >
              Meet Our Tenants
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white px-8 py-10 border-b border-stone-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Address', value: '323 S Pearl St' },
            { label: 'Neighborhood', value: 'Washington Park West' },
            { label: 'Built / Renovated', value: '1940 / 2018' },
            { label: 'Building Size', value: '~1,800 SF' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">{label}</p>
              <p className="text-gray-800 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tenants */}
      <section id="tenants" className="bg-stone-50 px-8 py-20 border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Our Community</p>
          <h3 className="text-2xl font-light text-gray-800 mb-10">Current Tenants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Gold Rush Esthetics',
                desc: 'Boutique esthetics studio specializing in advanced skin care treatments.',
                rating: '5.0 ⭐ (143 reviews)',
                href: 'https://www.google.com/search?q=Gold+Rush+Esthetics+Denver',
              },
              {
                name: 'AFMT | Anthony Frasco Massage & Lymphatic Therapies',
                desc: 'Specialized massage and lymphatic therapy services.',
                rating: '5.0 ⭐ (39 reviews)',
                href: 'https://www.google.com/search?q=AFMT+Anthony+Frasco+Denver',
              },
              {
                name: 'ART Aesthetics Denver',
                desc: 'Advanced aesthetic treatments in a boutique setting.',
                rating: '5.0 ⭐ (26 reviews)',
                href: 'https://www.google.com/search?q=ART+Aesthetics+Denver',
              },
              {
                name: 'Delta Zulu LLC',
                desc: 'Investment and operating company. Management office.',
                rating: null,
                href: 'https://deltazulu.com',
              },
            ].map(({ name, desc, rating, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-6 shadow-sm border border-stone-100 hover:shadow-md transition group"
              >
                <h4 className="font-semibold text-gray-800 group-hover:text-gray-600 transition mb-2">{name}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{desc}</p>
                {rating && <p className="text-xs text-stone-400">{rating}</p>}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Suite Availability */}
      <section className="bg-white px-8 py-20 border-b border-stone-100">
        <div className="max-w-5xl mx-auto md:flex md:items-start md:gap-16">
          <div className="flex-1 mb-10 md:mb-0">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Join Us</p>
            <h3 className="text-2xl font-light text-gray-800 mb-4">Suite Availability</h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              Private office suites are available for wellness professionals, therapists, and health-adjacent
              businesses. Dairy Hills is a small, curated community — we prioritize tenants who complement the
              existing mix and contribute to a collaborative atmosphere.
            </p>
            <a
              href="mailto:manager@dairy-hills.com?subject=Suite%20Inquiry"
              className="inline-block bg-gray-900 text-white text-sm px-6 py-3 rounded hover:bg-gray-700 transition"
            >
              Get in Touch
            </a>
          </div>
          <div className="flex-1 bg-stone-50 rounded-lg p-8 border border-stone-100">
            <h4 className="font-semibold text-gray-700 mb-4">What&apos;s Included</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {[
                'Private, lockable office suites',
                'High-speed internet',
                'Shared common areas',
                'On-street parking',
                'Washington Park West location',
                'Quiet, professional environment',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Current Availability */}
      <section id="availability" className="bg-white px-8 py-20 border-b border-stone-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Leasing</p>
          <h3 className="text-2xl font-light text-gray-800 mb-4">Current Availability</h3>

          <div className="bg-stone-50 border border-stone-200 rounded-lg p-8 mb-8">
            <div className="md:flex md:items-start md:justify-between gap-8">
              <div>
                <div className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                  Available Now
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Suite 30 — Private Office</h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                  Private, lockable office suite in a quiet professional environment. Ideal for a solo practitioner
                  or small wellness business. Shared common areas, high-speed internet included. Washington Park West
                  location — convenient for clients across South Denver.
                </p>
                <p className="text-xs text-stone-400 mt-4">
                  Also listed on{' '}
                  <a
                    href="https://www.crexi.com/lease/properties/1125647/colorado-dairy-hills---suite-30"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-stone-600"
                  >
                    Crexi
                  </a>
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex-shrink-0">
                <a
                  href="mailto:manager@dairy-hills.com?subject=Suite%2030%20Inquiry"
                  className="inline-block bg-gray-900 text-white text-sm px-6 py-3 rounded hover:bg-gray-700 transition whitespace-nowrap"
                >
                  Inquire About Suite 30
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 text-white">
            <div className="md:flex md:items-center md:justify-between gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Join the Waitlist</h4>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                  Dairy Hills is a small, curated community and suites move quickly. If Suite 30 isn&apos;t the
                  right fit or timing, join our waitlist and we&apos;ll reach out when something opens up.
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex-shrink-0">
                <a
                  href="mailto:manager@dairy-hills.com?subject=Waitlist%20Request"
                  className="inline-block border border-gray-500 text-gray-300 text-sm px-6 py-3 rounded hover:border-white hover:text-white transition whitespace-nowrap"
                >
                  Join the Waitlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-stone-50 px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Location</p>
          <h3 className="text-2xl font-light text-gray-800 mb-4">Washington Park West, Denver</h3>
          <p className="text-gray-500 leading-relaxed max-w-2xl mb-6">
            Situated in one of Denver&apos;s most walkable and desirable neighborhoods, Dairy Hills is steps from
            Washington Park, Pearl Street dining, and South Broadway. Easy access from I-25 and ample on-street
            parking make it convenient for both practitioners and their clients.
          </p>
          <a
            href="https://maps.google.com/?q=323+S+Pearl+St+Denver+CO+80209"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-700 hover:underline"
          >
            323 S Pearl St, Denver, CO 80209 →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 px-8 py-6 text-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span>© 2026 Dairy Hills LLC. All rights reserved.</span>
          <span>
            A{' '}
            <a href="https://deltazulu.com" className="hover:text-gray-300 transition">
              Delta Zulu LLC
            </a>{' '}
            company ·{' '}
            <a href="mailto:manager@dairy-hills.com" className="hover:text-gray-300 transition">
              manager@dairy-hills.com
            </a>
          </span>
        </div>
      </footer>
    </main>
  )
}
