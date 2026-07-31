import React from 'react';
import { ShieldCheck, Award, Users, Award as CertificateIcon, Landmark, Star, FileCheck2 } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ── Hero Image Header ─────────────────────────────────────────── */}
      <section className="bg-kp-blue-900 text-white py-16 px-4 relative overflow-hidden">
        {/* Dot-grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#4da6d9_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            About KP BIG BAGS
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-kp-blue-100 max-w-2xl font-light leading-relaxed">
            Learn about our decade-long journey of manufacturing and exporting elite-quality industrial packaging solutions globally.
          </p>
        </div>
      </section>

      {/* ── Main Info Section ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">
                Our Company Profile
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-kp-blue-900 leading-tight">
                Reputable Manufacturer of FIBC Bags and Industrial Packaging Products
              </h2>
              <div className="text-sm sm:text-base text-slate-600 space-y-4 font-light leading-relaxed">
                <p>
                  Based in the industrial hub of Ahmedabad,Gujarat,India,{' '}
                  <strong className="font-semibold text-kp-blue-950">KP BIG BAGS</strong> has grown into an
                  international manufacturing partner and exporter. We specialize in producing Flexible Intermediate
                  Bulk Containers (FIBC) jumbo bags, BOPP laminated sacks, technical textiles, geosynthetics, and
                  essential polyolefin products.
                </p>
                <p>
                  As an{' '}
                  <strong className="font-semibold text-kp-blue-950">ISO 9001:2015 certified company</strong>, our
                  facilities are equipped with integrated extrusion and circular weaving machinery that operates
                  under strict hygienic controls. This lets us serve food-grade, pharmaceutical, and chemical B2B
                  industries with zero-contamination guarantees.
                </p>
                <p>
                  Our strategic location in Gujarat provides significant logistical advantages with seamless connectivity to the major ports of Mundra,Kandla and Nhava Sheva (Jawaharlal Nehru Port), Mumbai. This enables efficient domestic transportation, rapid global shipping, and a reliable supply chain, ensuring timely deliveries to our clients across Europe, the Americas, Africa, Asia, and the Middle East.

                </p>
              </div>

              {/* Quick Credentials */}
              <div className="bg-kp-blue-50/50 border border-kp-blue-100 rounded-2xl p-6 space-y-4 shadow-inner">
                <h3 className="text-sm font-bold text-kp-blue-900 border-b border-kp-blue-100 pb-3 uppercase tracking-wider">
                  Quick Credentials
                </h3>
                {[
                  { icon: <CertificateIcon className="w-5 h-5 text-kp-blue-600" />, label: 'Quality Standard',      value: 'ISO 9001:2015 Registered' },
                  { icon: <Landmark        className="w-5 h-5 text-kp-blue-600" />, label: 'Headquarters Location', value: 'Ahmedabad, Gujarat, India' },
                  { icon: <Users           className="w-5 h-5 text-kp-blue-600" />, label: 'Factory Workforce',     value: '150+ Skilled Technicians' },
                  { icon: <Star            className="w-5 h-5 text-kp-blue-600" />, label: 'Primary Markets',       value: 'North America, EU, Gulf States, Africa' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-kp-blue-100/50 text-kp-blue-600 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block">{item.label}</span>
                      <span className="text-sm font-bold text-kp-blue-950">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – Manufacturing Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="group relative w-full overflow-hidden rounded-2xl shadow-2xl aspect-[/2]">
                <img
                  src="/public/about us.png"
                  alt="KP Big Bags company profile and manufacturing overview"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-kp-blue-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-xl px-4 py-2.5">
                  ISO 9001:2015 certified manufacturing facility — Ahmedabad, India
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Pillars Section ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-kp-blue-50/30 border-y border-kp-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">
              Our Core Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-kp-blue-900">
              What Guides KP Big Bags
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
              We stand firmly on four structural pillars that support our operations and guide our B2B client partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6 text-kp-blue-600" />,
                title: 'Safety Integrity',
                desc: 'Every FIBC bag is load-tested under rigorous Safe Working Load limits. We ensure zero failure points on lifting seams.',
              },
              {
                icon: <Award className="w-6 h-6 text-kp-blue-600" />,
                title: 'Quality Precision',
                desc: 'We strictly purchase 100% virgin polymer granules. No recycled scrap is allowed, guaranteeing maximum tensile durability.',
              },
              {
                icon: <Users className="w-6 h-6 text-kp-blue-600" />,
                title: 'B2B Customization',
                desc: 'We build bags according to client drawings. From baffle liners to customized multi-color logo printing, we build it.',
              },
              {
                icon: <CertificateIcon className="w-6 h-6 text-kp-blue-600" />,
                title: 'Sustainability',
                desc: 'Our high-tenacity multifilament woven fabrics are designed for long cycles, minimizing secondary shipping waste.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white border border-kp-blue-100 p-6 rounded-2xl text-left flex flex-col justify-between hover:shadow-md hover:border-kp-blue-200 transition-all duration-300"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-kp-blue-50 inline-block mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="font-bold text-kp-blue-900 text-base mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications Section (List of Certifications) ─────────────
    Card-style layout: white card, logo(s) on top, cert name/subtitle,
    and a solid theme-blue button that opens the actual certificate
    PDF in a new tab when clicked. ───────────────────────────────── */}
<section className="py-16 sm:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-kp-blue-900">
        List of Certifications
      </h2>
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
        KP Big Bags is an <strong>ISO 9001:2015</strong> and <strong>ISO 22000:2018</strong> certified
        organization, and is also <strong>CE certified</strong> under the EMC &amp; Measuring Instruments
        Directives — reflecting our commitment to quality, food safety, and international compliance
        standards since inception.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {[
        {
          title: 'ISO 9001:2015',
          subtitle: 'Quality Management System',
          logos: ['certificates/QRO CERTIFICATE.png'],
          file: '/certificates/KP BIG BAGS QRO EGAC 2015.pdf',
        },
        {
          title: 'ISO 22000:2018',
          subtitle: 'Food Safety Management System',
          logos: ['/certificates/QRO CERTIFICATE.png'],
          file: '/certificates/KP BIG BAGS QRO EGAC 2018.pdf',
        },
        {
          title: 'CE Compliance Certificate',
          subtitle: '(European Conformity)',
          logos: ['/certificates/TSN CERTIFICATE.png', '/certificates/EUAS CERTIFICATE.png'],
          file: '/certificates/TSN FINAL CE  KP BIG BAGS.pdf',
        },
      ].map((cert, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center text-center"
        >
          {/* Logo(s) */}
          <div className="flex items-center justify-center gap-4 h-40 w-full mb-6 overflow-hidden">
  {cert.logos.map((logo, logoIdx) => (
    <img
      key={logoIdx}
      src={logo}
      alt={`${cert.title} certification logo`}
      className={`object-contain transition-transform duration-300 hover:scale-105 ${
        cert.logos.length === 1
          ? "max-h-36 max-w-[220px]"
          : "max-h-32 max-w-[140px]"
      }`}
    />
  ))}
</div>

          <h3 className="font-extrabold text-kp-blue-950 text-lg leading-tight">
            {cert.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 mb-6">
            {cert.subtitle}
          </p>

          {/* Download / View button — opens the actual certificate */}
          <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full bg-kp-blue-600 hover:bg-kp-blue-700 transition-colors duration-200 text-white text-sm font-bold uppercase tracking-wide rounded-md py-3"
                >
                  Download
                </a>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── Vision & Mission ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-kp-blue-50/30 border-t border-kp-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="bg-white border border-kp-blue-100 p-8 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-kp-blue-900 flex items-center gap-2">
                <span className="p-1.5 bg-kp-blue-100 rounded-lg text-kp-blue-600">🎯</span>
                Our Vision
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                To be the global reference point for heavy-duty polymer packing solutions by continuously introducing
                advanced engineering processes, enhancing bag geometries, and providing unparalleled technical support.
                We aim to contribute to safer and more efficient global cargo handling systems while reducing the carbon
                footprint of transport packaging.
              </p>
            </div>

            <div className="bg-white border border-kp-blue-100 p-8 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-kp-blue-900 flex items-center gap-2">
                <span className="p-1.5 bg-kp-blue-100 rounded-lg text-kp-blue-600">🚀</span>
                Our Mission
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                To manufacture premium grade, zero-leakage FIBC containers, agro-textiles, and protective tarpaulins
                that meet strict international ISO, ASTM, and DIN standards. We commit to supporting our clients with
                reliable batch testing, transparent pricing, timely delivery cycles, and customized sizes to improve
                their bulk logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Gallery ─────────────────────────────────────────────── */}
      {/* Each image already has its own title + description baked in (top-left
          panel), so the cards use the image's native 3:2 aspect ratio with
          object-cover — this guarantees ZERO cropping of that text panel on
          any screen size, and no redundant caption overlay is needed. */}
      <section className="py-16 sm:py-20 bg-white border-t border-kp-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">
              Inside Our Operations
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-kp-blue-900">
              A Glimpse of Our Facility
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed">
              From skilled workforces to precision machinery and seamless global shipping — KP Big Bags delivers end-to-end.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                src: '/public/aboutus-Glimpse-1.png',
                alt: 'Skilled workforce stitching and finishing FIBC jumbo bags at KP Big Bags',
              },
              {
                src: '/public/aboutus-Glimpse-2.png',
                alt: 'Precision extrusion and circular weaving machinery on the KP Big Bags factory floor',
              },
              {
                src: '/public/aboutus-Glimpse-3.png',
                alt: 'Global shipping of KP Big Bags FIBC containers via port and air freight',
              },
            ].map((img, idx) => (
              <div
                key={idx}
                className="group relative w-full overflow-hidden rounded-2xl shadow-md border border-kp-blue-100 aspect-[3/2]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}