import React from 'react';
import { Layers, ShieldCheck, Cpu, Box, Globe } from 'lucide-react';

/**
 * ============================================================================
 * IMAGES KAISE LAGAYEIN
 * ============================================================================
 * Is page mein pehle 3 image paths (/images/factory-overview.jpg,
 * /images/factory-strip.jpg, /images/cleanroom-facility.jpg) point kar rahe
 * the un files ki taraf jo project mein exist hi nahi karti thi — isiliye
 * wahan broken image dikh rahi thi. Ab fix kar diya hai:
 *
 *   1. cleanroom-facility.jpg -> Yeh aapki di gayi asli cleanroom photo hai
 *      (Quality page waali). "images/infrastructure/" folder ko apne
 *      project ke public/images/infrastructure/ mein copy kar dein.
 *
 *   2. factory-overview.jpg aur factory-strip.jpg -> Abhi in dono jagah
 *      demo placeholder photos lagi hain (taaki layout broken na dikhe).
 *      Jab aap apni factory floor / weaving loom ki asli photos bhejenge,
 *      main turant inhe replace kar dunga — ya aap khud
 *      public/images/infrastructure/ mein daal kar src update kar sakte hain.
 * ============================================================================
 */

export default function Infrastructure() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-kp-blue-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4da6d9_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Our Infrastructure
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-kp-blue-100 max-w-2xl font-light leading-relaxed">
            Take a look inside our integrated polymer extrusion, high-speed circular weaving, and food-grade packaging facilities.
          </p>
        </div>
      </section>

      {/* Main Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-16">

          {/* Facility Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">
                Manufacturing Capabilities
              </span>
              <h2 className="text-3xl font-extrabold text-kp-blue-900 leading-tight">
                Modern Production Plant Engineered for High Capacity
              </h2>
              <div className="text-sm sm:text-base text-slate-600 space-y-4 font-light leading-relaxed">
                <p>
                  Located in the premier industrial zone of Ahmedabad, Gujarat, India,{' '}
                  <strong className="font-semibold text-kp-blue-950">KP BIG BAGS</strong> operates a
                  highly integrated factory. Our infrastructure houses all critical operations under
                  one roof, allowing us to maintain 100% control over quality logs, tape dimensions,
                  and weaving densities.
                </p>


                <p>
                  Our machinery lines are designed for energy efficiency and high throughput. We can
                  process over{' '}
                  <strong className="font-semibold text-kp-blue-950">12,000 metric tons</strong> of
                  polypropylene polymer granules annually, converting them into finished packaging
                  bags, heavy-duty tarpaulins, and agricultural fabrics.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-kp-blue-50/50 border border-kp-blue-100 rounded-3xl p-8 space-y-6 w-full shadow-inner">
                <h3 className="text-lg font-bold text-kp-blue-900 border-b border-kp-blue-100 pb-3 uppercase tracking-wider">
                  Factory Operations Metrics
                </h3>
                {[
                  { icon: <Cpu className="w-5 h-5 text-kp-blue-600" />, label: 'Extrusion Capacity', value: '1,000+ Tons per Month' },
                  { icon: <Layers className="w-5 h-5 text-kp-blue-600" />, label: 'Weaving Looms', value: '48+ High-Speed Looms' },
                  { icon: <Box className="w-5 h-5 text-kp-blue-600" />, label: 'Sewing Machinery', value: '120+ Heavy-Duty Sewing Stations' },
                  { icon: <Globe className="w-5 h-5 text-kp-blue-600" />, label: 'Port Proximity', value: 'Direct Highway connection to Mundra & Kandla' },
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-kp-blue-100/50 text-kp-blue-600 flex items-center justify-center shrink-0">
                      {stat.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                        {stat.label}
                      </span>
                      <span className="text-sm font-bold text-kp-blue-950">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Machinery Details */}
          <div className="space-y-8">
            <h3 className="text-2xl font-extrabold text-kp-blue-900 border-b border-kp-blue-100 pb-3 uppercase tracking-wider">
              Integrated Production Stages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  stage: '01. Extrusion & Slitting',
                  title: 'High-Tenacity Tape Extrusion',
                  desc: 'Polypropylene raw granules are melted and extruded into thin film sheets, which are cut into precise micro-tapes.',
                },
                {
                  stage: '02. Circular & Projectile Weaving',
                  title: 'High-Speed Loom Weaving',
                  desc: 'Spools are loaded onto specialized circular looms or flat projectile Sulzer looms, weaving patterns from 60 GSM to 250 GSM.',
                },
                {
                  stage: '03. Converting & Sew Line',
                  title: 'Automated Cutting & Clean Sewing',
                  desc: 'Fabrics are cut to custom lengths and stitched in positive-pressure environments to prevent dust contamination.',
                },
              ].map((stage, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 space-y-4 hover:bg-kp-blue-50/20 hover:border-kp-blue-100 hover:shadow-sm transition-all duration-300"
                >
                  <span className="text-xs font-bold text-kp-blue-500 uppercase tracking-wider block">
                    {stage.stage}
                  </span>
                  <h4 className="text-lg font-bold text-kp-blue-900 leading-tight">{stage.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Room Facility Details */}
          <div className="bg-kp-blue-50/20 border border-kp-blue-100 rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-kp-blue-600 uppercase tracking-widest block">
                Hygienic Standards
              </span>
              <h3 className="text-2xl font-bold text-kp-blue-900">
                Food & Pharma Grade FIBC Cleanroom
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Our cleanroom is built with epoxy-coated seamless flooring, positive-pressure air
                curtains, HEPA air filtration systems, and strict personnel hygiene locks. We maintain
                zero-tolerance for foreign contaminants, ensuring full compliance for pharmaceutical
                and food-grade packaging.
              </p>
              <div className="flex items-center gap-3 pt-4">
                <div className="p-3 rounded-xl bg-white border border-kp-blue-100 shadow-sm text-kp-blue-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    CERTIFIED COMPLIANCE
                  </span>
                  <span className="text-sm font-bold text-kp-blue-900">BRCGS & FDA Registered</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
              <img
                src="/public/infra2.jpeg"
                alt="Positive-pressure cleanroom production line for food and pharma-grade FIBC bags"
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.parentElement.classList.add('h-64', 'flex', 'items-center', 'justify-center');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}