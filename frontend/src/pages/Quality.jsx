import React from 'react';
import { ShieldCheck, Microscope, RefreshCw, Layers, Award } from 'lucide-react';

/**
 * ============================================================================
 * IMAGES KAISE LAGAYEIN
 * ============================================================================
 * Neeche di gayi 5 images aapki apni uploaded photos hain (stock/unsplash
 * NAHI hain). Inhe project mein use karne ke liye:
 *
 *   1. "images/quality" folder ko apne project ke  public/images/quality/
 *      folder mein copy kar dein, taaki paths jaise
 *      "/images/quality/quality-lab.png" browser mein sahi resolve ho.
 *
 *   2. Agar aap Next.js / Vite / CRA use kar rahe hain to public folder
 *      root se serve hota hai, isliye path hamesha "/images/..." se
 *      shuru hoga (bina "public" likhe).
 *
 * Files:
 *   - quality-lab.png            -> Hero background + Intro section photo
 *   - electronic-tensile-test.png -> "Electronic Tensile Strength Test" card
 *   - accelerated-uv-test.png     -> "Accelerated UV Weathering Test" card
 *   - anti-sifting-test.png       -> "Anti-Sifting & Leakage Test" card
 *   - cleanroom-manufacturing.jpg -> Food-Grade Cleanroom section photo
 * ============================================================================
 */

export default function Quality() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header with background image */}
      <section className="bg-kp-blue-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4da6d9_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">Quality Assurance & Labs</h1>
          <p className="text-sm sm:text-base md:text-lg text-kp-blue-100 max-w-2xl font-light leading-relaxed">
            Discover our rigorous chemical, tensile strength, and safe load testing operations that ensure the highest B2B packaging reliability.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">Quality Control Standards</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-kp-blue-900 leading-tight">
                ISO 9001:2015 Compliant Quality Management Systems
              </h2>
              <div className="text-sm sm:text-base text-slate-600 space-y-4 font-light leading-relaxed">
                <p>
                  At <strong className="font-semibold text-kp-blue-950">KP BIG BAGS</strong>, quality isn't a final check; it is an active control process integrated throughout our production cycle. From the analysis of incoming polypropylene polymer granules to extrusion, loom settings, panel measurements, stitching thread tension, and packing parameters, everything is logged.
                </p>
                <p>
                  Our internal testing laboratory is equipped with calibrated testing machinery. Every batch of fabrics, webbings, sewing threads, and final bags undergoes structural mechanical load cycles to verify safety limits. We strictly maintain a Safe Working Load (SWL) safety factor of <strong className="font-semibold text-kp-blue-950">5:1 for single-trip</strong> applications and <strong className="font-semibold text-kp-blue-950">6:1 for heavy-duty multi-trip</strong> reuse.
                </p>
              </div>
            </div>

            {/* Right: Real Lab Photo */}
            <div className="lg:col-span-5 flex justify-center">
  <div className="group relative w-full overflow-hidden rounded-3xl border border-kp-blue-100 bg-white shadow-xl hover:shadow-2xl transition-all duration-500">

    {/* Image */}
    <img
      src="/quality.png"
      alt="Quality control standards board and safe working load testing rig at KP BIG BAGS"
      loading="lazy"
      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-kp-blue-900/70 via-kp-blue-900/10 to-transparent"></div>

    {/* Bottom Content */}
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
        ISO 9001:2015 Certified
      </span>
    </div>

  </div>
</div>
          </div>
        </div>
      </section>

      {/* Lab Testing Capabilities */}
      <section className="py-16 sm:py-20 bg-kp-blue-50/30 border-y border-kp-blue-100 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">Laboratory Verification</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-kp-blue-900 text-center">Comprehensive Testing Protocols</h2>
            <p className="text-sm sm:text-base text-slate-500 text-center leading-relaxed font-light">
              Our in-house laboratory runs tests to ensure materials withstand physical stress, UV radiation, and environmental exposure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    {
      title: "Electronic Tensile Strength Test",
      desc: "Measures breaking load and elongation properties of tape, woven fabric, webbings, and sewing yarn to ensure maximum tensile performance and prevent transport failures.",
      img: "/Electronic.png",
      alt: "Electronic Tensile Strength Test",
    },
    {
      title: "Accelerated UV Weathering Test",
      desc: "Simulates prolonged UV exposure using weathering chambers to verify polymer stabilization and long-term outdoor durability.",
      img: "/Accelerated.png",
      alt: "Accelerated UV Weathering Test",
    },
    {
      title: "Anti-Sifting & Leakage Test",
      desc: "Checks filler cords, felt cords, stitching quality, and dust-proof seams to ensure zero leakage of fine powders and chemicals.",
      img: "/Anti-Sifting.png",
      alt: "Anti-Sifting Leakage Test",
    },
  ].map((test, idx) => (
    <div
      key={idx}
      className="group bg-white rounded-2xl border border-kp-blue-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={test.img}
          alt={test.alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-kp-blue-900/40 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="inline-block mb-3 text-[11px] font-semibold tracking-widest uppercase text-kp-blue-600 bg-kp-blue-50 px-3 py-1 rounded-full">
          Laboratory Test
        </span>

        <h3 className="text-xl font-bold text-kp-blue-900 mb-3 leading-snug group-hover:text-kp-blue-700 transition-colors">
          {test.title}
        </h3>

        <p className="text-slate-600 text-sm leading-7">
          {test.desc}
        </p>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Certifications bar */}
      <section className="py-10 bg-white border-b border-kp-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {['ISO 9001:2015', 'UN Certified', 'Food Grade BRC', 'REACH Compliant', 'FDA Standards'].map((cert, i) => (
              <div key={i} className="flex items-center gap-2 text-kp-blue-900">
                <Award className="w-5 h-5 text-kp-blue-600 shrink-0" />
                <span className="text-sm font-bold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Management System */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Section */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Image */}
            <div className="relative">
              <div className="absolute -bottom-6 -left-6 w-56 h-56 bg-red-600 rounded-sm -z-10"></div>

              <img
                src="/quality.png"
                alt="Quality inspection during FIBC production"
                className="w-full rounded shadow-2xl object-cover"
              />
            </div>

            {/* Right Content */}
            <div>

              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-kp-blue-600">
                Quality Management
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-kp-blue-900 mt-3 mb-6">
                Quality Assurance System
              </h2>

              <div className="space-y-5 text-slate-600 leading-8">

                <p>
                  We do not compromise on quality and always go an extra mile to
                  maintain consistent manufacturing standards.
                </p>

                <p>
                  The Quality Assurance System at <strong>KP BIG BAGS</strong> follows
                  a systematic manufacturing methodology backed by trained quality
                  professionals and documented inspection procedures.
                </p>

                <div>

                  <h3 className="text-lg font-bold text-kp-blue-900">
                    Online Inspection
                  </h3>

                  <p>
                    Continuous inspections are performed during production to identify
                    and eliminate process deviations immediately at their point of
                    occurrence.
                  </p>

                </div>

                <div>

                  <h3 className="text-lg font-bold text-kp-blue-900">
                    Trend Analysis
                  </h3>

                  <p>
                    Inspection data is continuously analyzed to identify long-term
                    quality trends and improve manufacturing performance.
                  </p>

                </div>

                <p>
                  Our independent Quality Assurance Department is equipped with
                  calibrated testing instruments including tensile testing machines,
                  UV weathering equipment and FIBC load testing facilities to verify
                  fabric strength, elongation, UV resistance and Safe Working Load
                  (SWL) as per international standards.
                </p>

              </div>

            </div>

          </div>

          {/* Inspection Process */}
          <div className="mt-20">

            <h2 className="text-3xl font-extrabold text-kp-blue-900 mb-2">
              Quality Management System
            </h2>

            <p className="text-slate-500 mb-10">
              Pre-production, in-process and final inspection procedures are
              implemented throughout the manufacturing cycle to ensure consistent
              product quality.
            </p>

            {/* Pre Production */}
            <div className="mb-10">

              <h3 className="text-2xl font-bold text-kp-blue-900 mb-6">
                In-Process Inspection
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="rounded-xl border border-kp-blue-100 p-6">

                  <h4 className="font-bold text-kp-blue-900 mb-2">
                    Tape & Yarn
                  </h4>

                  <p className="text-slate-600">
                    Every production lot of tapes and yarn is checked for colour,
                    denier and tensile strength.
                  </p>

                </div>

                <div className="rounded-xl border border-kp-blue-100 p-6">

                  <h4 className="font-bold text-kp-blue-900 mb-2">
                    Woven Fabric / Webbing
                  </h4>

                  <p className="text-slate-600">
                    Every loom-produced fabric is inspected for weaving quality,
                    colour, width, weight, strength and finishing.
                  </p>

                </div>

                <div className="rounded-xl border border-kp-blue-100 p-6">

                  <h4 className="font-bold text-kp-blue-900 mb-2">
                    Cut Components
                  </h4>

                  <p className="text-slate-600">
                    Individual cut panels and components are verified for accurate
                    dimensions before stitching.
                  </p>

                </div>

                <div className="rounded-xl border border-kp-blue-100 p-6">

                  <h4 className="font-bold text-kp-blue-900 mb-2">
                    Printed Components
                  </h4>

                  <p className="text-slate-600">
                    Printed bags are inspected for print quality, ink adhesion,
                    registration and colour consistency.
                  </p>

                </div>

                <div className="rounded-xl border border-kp-blue-100 p-6">

                  <h4 className="font-bold text-kp-blue-900 mb-2">
                    Stitched Bags
                  </h4>

                  <p className="text-slate-600">
                    Every stitched bag undergoes visual inspection for stitching,
                    dimensions and accessories before testing.
                  </p>

                </div>

                <div className="rounded-xl border border-kp-blue-100 p-6">

                  <h4 className="font-bold text-kp-blue-900 mb-2">
                    Tensile Test
                  </h4>

                  <p className="text-slate-600">
                    Tape yarn and woven fabrics are tested for tensile and breaking
                    strength using universal testing methods.
                  </p>

                </div>

                <div className="rounded-xl border border-kp-blue-100 p-6">

                  <h4 className="font-bold text-kp-blue-900 mb-2">
                    UV Weathering Test
                  </h4>

                  <p className="text-slate-600">
                    Fabrics are tested for UV stability using accelerated weathering
                    systems according to specification requirements.
                  </p>

                </div>

              </div>

            </div>

            {/* Final Inspection */}

            <div>

              <h3 className="text-2xl font-bold text-kp-blue-900 mb-6">
                Final Inspection
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="rounded-xl border border-kp-blue-100 p-6">

                  <h4 className="font-bold text-kp-blue-900 mb-2">
                    Packing
                  </h4>

                  <p className="text-slate-600">
                    Packed bales are checked for wrapping quality, counting accuracy
                    and weight verification.
                  </p>

                </div>

                <div className="rounded-xl border border-kp-blue-100 p-6">

                  <h4 className="font-bold text-kp-blue-900 mb-2">
                    Rig Test
                  </h4>

                  <p className="text-slate-600">
                    Rig testing is conducted to verify the Safe Working Load (SWL) of
                    FIBCs in accordance with ISO standards.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
      
    </div>
  );
}