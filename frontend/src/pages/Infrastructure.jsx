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

const infrastructureImages = [
  "/infra-gallery/1.jpg",
  "/infra-gallery/2.jpg",
  "/infra-gallery/3.jpg",
  "/infra-gallery/4.jpg",
  "/infra-gallery/5.jpg",
  "/infra-gallery/6.jpg",
  "/infra-gallery/7.jpg",
  "/infra-gallery/8.jpg",
];

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left */}
            <div className="lg:col-span-8 space-y-6">

              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-kp-blue-600">
                Manufacturing Capabilities
              </span>

              <h2 className="text-3xl font-extrabold text-kp-blue-900">
                Modern Production Plant & Infrastructure
              </h2>

              <p className="text-slate-600 leading-8">
                KP BIG BAGS operates a fully integrated manufacturing facility equipped
                with modern extrusion, weaving, coating, cutting, printing and stitching
                systems. Our infrastructure enables complete in-house production while
                maintaining consistent quality standards and production efficiency.
              </p>

            </div>

          </div>

          {/* Infrastructure */}
          <div className="space-y-8">

            <h3 className="text-3xl font-extrabold text-kp-blue-900">
              Infrastructure
            </h3>

            <ul className="grid md:grid-cols-2 gap-x-10 gap-y-5">

              {[
                {
                  title:"Extrusion",
                  text:"2 extrusion lines capable of producing polypropylene tapes of various weights and strengths with a combined production capacity of 600 kg/hour per line."
                },
                {
                  title:"Circular Looms",
                  text:"49 circular looms capable of manufacturing woven fabrics of multiple widths, including two dedicated looms for ventilated fabrics."
                },
                {
                  title:"Belt Weaving",
                  text:"10 needle looms along with a dedicated machine for dust-proof webbing production."
                },
                {
                  title:"Lamination",
                  text:"90 mm extrusion coating plant with a maximum lamination width of 2.05 meters."
                },
                {
                  title:"Fibrillator",
                  text:"Dedicated fibrillator machines for polypropylene thread used in food-grade bags."
                },
                {
                  title:"Fabric Cutting",
                  text:'Three jumbo bag fabric cutting lines supporting 60" and 80" widths.'
                },
                {
                  title:"Belt Cutting",
                  text:"Three automatic belt/webbing cutting machines."
                },
                {
                  title:"Printing",
                  text:"Two jumbo bag printing machines with four-color capability and one roll-to-roll printing machine for woven sack bags."
                },
                {
                  title:"Automatic Cutting",
                  text:"Two automatic cutting and stitching machines."
                },
                {
                  title:"Liner Plants",
                  text:"Three multilayer extrusion plants for liner production and jumbo bag stitching."
                },
                {
                  title:"Gluing Machine",
                  text:"Dedicated gluing equipment for glue-fitted liners."
                },
                {
                  title:"Metal Detector",
                  text:"Metal detection systems for food-grade FIBC manufacturing."
                },
                {
                  title:"Multifilament Plant",
                  text:"Production capacity ranging from 650 Denier to 4000 Denier."
                }

              ].map((item,index)=>(
                <li
                  key={index}
                  className="flex gap-3 items-start"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-kp-blue-600 flex-shrink-0" />

                  <p className="text-slate-600 leading-7 text-sm">
                    <span className="font-bold text-kp-blue-900">{item.title}: </span>
                    {item.text}
                  </p>
                </li>
              ))}

            </ul>

            <div className="grid lg:grid-cols-2 gap-8 mt-10">

              <div className="rounded-2xl border border-kp-blue-100 p-8">

                <h4 className="text-2xl font-bold text-kp-blue-900 mb-4">
                  Clean Room Facility
                </h4>

                <p className="text-slate-600 leading-8">
                  We manufacture FIBCs in a dedicated clean room facility designed to
                  meet stringent customer requirements. The facility maintains hygienic
                  conditions from fabric production to final packing and complies with
                  international standards. It is equipped with ultrasonic cutting, air
                  washing systems and metal detection equipment to ensure optimum food
                  safety.
                </p>

              </div>

              <div className="rounded-2xl border border-kp-blue-100 p-8">

                <h4 className="text-2xl font-bold text-kp-blue-900 mb-4">
                  Testing Laboratory
                </h4>

                <p className="text-slate-600 leading-8">
                  Our laboratory performs breaking strength, elongation, UV resistance,
                  load testing, dart impact testing, coefficient of friction testing,
                  air permeability testing, conductivity testing and UN testing in
                  accordance with national and international standards.
                </p>

              </div>

            </div>

          </div>

          {/* Infrastructure Gallery */}
          <div className="space-y-8">

            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-kp-blue-600 block">
                Factory Gallery
              </span>

              <h3 className="text-3xl font-extrabold text-kp-blue-900 mt-2">
                Manufacturing Infrastructure
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

              {infrastructureImages.map((image, index) => (

                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-kp-blue-100 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >

                  <img
                    src={image}
                    alt={`Infrastructure ${index + 1}`}
                    loading="lazy"
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

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
              <div className="text-sm text-slate-600 leading-7 space-y-4">

                <p>
                KP BIG BAGS follows strict hygienic and housekeeping practices throughout the manufacturing process to ensure product quality and minimize contamination risks.
                </p>

                <ul className="list-disc pl-5 space-y-2">

                <li>Clean and well-maintained production facilities.</li>

                <li>Regular cleaning of production areas, machinery and equipment.</li>

                <li>Controlled storage of raw materials and finished goods.</li>

                <li>Mandatory use of Personal Protective Equipment (PPE) by production staff.</li>

                <li>Routine housekeeping and waste disposal procedures.</li>

                <li>Pest control measures in production and warehouse areas.</li>

                <li>Quality inspections at every stage of production.</li>

                <li>Safe handling and packaging practices during storage and shipment.</li>

                <li>Compliance with ISO 9001:2015 Quality Management System requirements.</li>

                </ul>

                </div>
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
                src="/infra2.jpeg"
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