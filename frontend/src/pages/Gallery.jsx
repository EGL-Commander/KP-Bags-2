import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Eye } from 'lucide-react';

/**
 * ============================================================================
 * IMAGES KAISE LAGAYEIN (READ THIS FIRST)
 * ============================================================================
 * Items 1, 2, 3 (Type-A Bags, Baffle Q-Bags, Ventilated Agricultural Bags)
 * mein ab aapki di gayi asli product photos lagi hain — "images/gallery"
 * folder ko apne project ke  public/images/gallery/  folder mein copy kar
 * dein taaki "/images/gallery/type-a-bags.jpeg" jaise paths sahi resolve ho.
 *
 * Items 4-9 (factory, testing, shipping) mein abhi bhi placeholder photos
 * hain (sirf demo ke liye). Unki bhi asli photos bhej dein — usi tarah ek
 * ek karke, jis order mein gallery mein dikhni hain — main unhe bhi turant
 * wire kar dunga.
 *
 * OPTION 1 (Recommended - apni site ke andar image folder):
 *   1. Apni images ko  public/images/gallery/  folder mein daal dein
 *      e.g. public/images/gallery/type-a-bags.jpeg
 *   2. src ko change karein:  src: "/images/gallery/type-a-bags.jpeg"
 *
 * OPTION 2 (Cloud hosting - Cloudinary / imgbb / your CDN):
 *   src: "https://res.cloudinary.com/your-account/type-a-bags.jpg"
 *
 * "alt" text hamesha rakhein — ye Google/SEO ke liye zaroori hai, aur
 * screen-reader users ke liye bhi (accessibility).
 * ============================================================================
 */

const galleryItems = [
  {
    id: 1,
    type: 'bags',
    title: 'Type-A Standard FIBC Bags',
    desc: 'Heavy-duty 1000kg load capacity standard bags stored in warehouse.',
    src: '/public/fibc-type-a.jpeg',
    alt: 'Type-A standard FIBC jumbo bag with four corner lifting loops',
  },
  {
    id: 2,
    type: 'bags',
    title: 'Baffle Q-Bags Stack',
    desc: 'Baffle bags maintaining neat square profiles under test loads.',
    src: '/public/baffle-bag.jpeg',
    alt: 'Baffle FIBC Q-bag diagram showing internal baffle panels and loops',
  },
  {
    id: 3,
    type: 'bags',
    title: 'Ventilated Agricultural Bags',
    desc: 'Ventilated FIBC bags packed with crops showing breathability strips.',
    src: '/public/Ventilated Agricultural Bags.png',
    alt: 'Ventilated mesh FIBC bags filled with fresh potatoes in a farm field',
  },
  {
    id: 4,
    type: 'factory',
    title: 'High-Speed Circular Looms',
    desc: 'Weaving area with circular looms running PP spools continuously.',
    src: '/public/high-speed-circular-loom.jpg',
    alt: 'High-speed circular looms weaving polypropylene fabric',
  },
  {
    id: 5,
    type: 'factory',
    title: 'Tape Extrusion Extruder',
    desc: 'Polypropylene melt extrusion and slitting line winding tape rolls.',
    src: '/public/Tape Extrusion Extruder.png',
    alt: 'Polypropylene tape extrusion line winding tape rolls',
  },
  {
    id: 6,
    type: 'factory',
    title: 'Positive Pressure Sew Block',
    desc: 'Cleanroom sewing lines with HEPA filtration and personnel hoods.',
    src: '/public/Positive Pressure Sew Block.png',
    alt: 'Cleanroom sewing line for FIBC bag manufacturing',
  },
  {
    id: 7,
    type: 'testing',
    title: 'Tensile Strength Test Bench',
    desc: 'Calibrated electronic mechanical tester testing loop seam breakage.',
    src: '/public/Tensile Strength Test Bench.png',
    alt: 'Electronic tensile strength testing bench for FIBC loop seams',
  },
  {
    id: 8,
    type: 'testing',
    title: 'UV Weather-Ometer Cabinet',
    desc: 'Accelerated solar exposure chambers testing fabric UV retention.',
    src: '/public/UV Weather-Ometer Cabinet.png',
    alt: 'UV weather-ometer chamber for accelerated fabric weathering tests',
  },
  {
    id: 9,
    type: 'shipping',
    title: 'Container Stuffing Dock',
    desc: 'Loading pallets of vacuum-compressed jumbo bags into export containers.',
    src: '/public/Container Stuffing Dock.png',
    alt: 'Workers loading compressed FIBC bag pallets into a shipping container',
  },
];

const filters = [
  { id: 'all', name: 'All Photos' },
  { id: 'bags', name: 'FIBC Bags' },
  { id: 'factory', name: 'Factory Floor' },
  { id: 'testing', name: 'Quality Testing' },
  { id: 'shipping', name: 'Shipping & Loading' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loadedImgs, setLoadedImgs] = useState({});

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.type === activeFilter);

  const openLightbox = (id) => {
    const index = filteredItems.findIndex((item) => item.id === id);
    if (index !== -1) setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = useCallback(
    (direction) => {
      setLightboxIndex((prev) => {
        if (prev === null) return prev;
        let nextIndex = prev + direction;
        if (nextIndex < 0) nextIndex = filteredItems.length - 1;
        else if (nextIndex >= filteredItems.length) nextIndex = 0;
        return nextIndex;
      });
    },
    [filteredItems.length]
  );

  // Keyboard support: Esc to close, arrows to navigate
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, navigateLightbox]);

  const markLoaded = (id) =>
    setLoadedImgs((prev) => ({ ...prev, [id]: true }));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-kp-blue-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4da6d9_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Media Gallery
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-kp-blue-100 max-w-2xl font-light leading-relaxed">
            Browse high-resolution photographs of our finished jumbo bags,
            state-of-the-art machinery, lab testing, and shipping docks.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-2">
          {filters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                activeFilter === tab.id
                  ? 'bg-kp-blue-600 text-white border-kp-blue-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-kp-blue-600'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openLightbox(item.id)}
                aria-label={`View enlarged photo: ${item.title}`}
                className="group relative text-left cursor-pointer overflow-hidden rounded-2xl bg-kp-blue-50 border border-kp-blue-100 flex flex-col justify-between h-64 shadow-sm hover:shadow-xl hover:border-kp-blue-200 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-kp-blue-500"
              >
                {/* Actual photo */}
                <div className="absolute inset-0 bg-slate-200">
                  {!loadedImgs[item.id] && (
                    <div className="absolute inset-0 animate-pulse bg-slate-200" />
                  )}
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    onLoad={() => markLoaded(item.id)}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                      loadedImgs[item.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>

                {/* Gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-kp-blue-950/80 via-kp-blue-950/10 to-transparent z-10" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-kp-blue-950/70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2 text-white transition-opacity duration-300 z-20">
                  <div className="p-3 bg-white/10 rounded-full border border-white/20">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest mt-2">
                    View Enlarged Photo
                  </span>
                </div>

                {/* Caption bar */}
                <div className="relative z-10 mt-auto p-5 flex justify-between items-end">
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm truncate drop-shadow-sm">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-kp-blue-100 font-bold uppercase tracking-wider block mt-0.5">
                      {item.type}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/90 text-kp-blue-600 shrink-0">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-kp-blue-950/95 flex flex-col justify-between z-50 py-8 px-4 select-none"
          role="dialog"
          aria-modal="true"
        >
          {/* Lightbox Header */}
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-white">
            <div className="min-w-0">
              <h3 className="text-lg font-bold truncate">
                {filteredItems[lightboxIndex].title}
              </h3>
              <span className="text-[10px] text-kp-blue-300 font-bold uppercase tracking-wider block mt-0.5">
                Category: {filteredItems[lightboxIndex].type}
              </span>
            </div>
            <button
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="text-white hover:text-kp-blue-300 focus:outline-none p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Center */}
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-4 py-8">
            <button
              onClick={() => navigateLightbox(-1)}
              aria-label="Previous photo"
              className="text-white hover:text-kp-blue-300 focus:outline-none p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-full max-h-[60vh] rounded-xl overflow-hidden bg-kp-blue-900 flex items-center justify-center">
                <img
                  key={filteredItems[lightboxIndex].id}
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].alt}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>
              <p className="text-sm text-kp-blue-100 max-w-md text-center leading-relaxed font-light mt-6">
                {filteredItems[lightboxIndex].desc}
              </p>
            </div>

            <button
              onClick={() => navigateLightbox(1)}
              aria-label="Next photo"
              className="text-white hover:text-kp-blue-300 focus:outline-none p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 shrink-0"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer */}
          <div className="text-center text-kp-blue-200 text-xs font-semibold">
            Photo {lightboxIndex + 1} of {filteredItems.length}
          </div>
        </div>
      )}
    </div>
  );
}