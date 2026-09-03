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

const filters = [
  { id: 'all', name: 'All Photos' },
  { id: 'bags', name: 'FIBC Bags' },
  { id: 'factory', name: 'Factory Floor' },
  { id: 'testing', name: 'Quality Testing' },
  { id: 'shipping', name: 'Shipping & Loading' },
];

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loadedImgs, setLoadedImgs] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/gallery?t=${new Date().getTime()}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setGalleryItems(data))
      .catch(err => console.error("Error fetching gallery:", err));
  }, []);

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
          className="fixed inset-0 bg-black/95 flex flex-col z-[100] backdrop-blur-sm animate-fade-in select-none"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="absolute top-0 inset-x-0 p-4 md:p-6 flex justify-between items-start z-50">
            <div className="text-white drop-shadow-md">
              <h3 className="text-xl md:text-2xl font-bold">{filteredItems[lightboxIndex].title}</h3>
              <span className="text-xs md:text-sm uppercase tracking-wider text-kp-blue-300">
                Category: {filteredItems[lightboxIndex].type}
              </span>
            </div>
            <button
              onClick={closeLightbox}
              className="p-3 text-white bg-white/10 hover:bg-white/20 hover:text-red-400 rounded-full transition-colors backdrop-blur-md border border-white/10"
              title="Close (Esc)"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          {/* Navigation Left - Full Height Clickable Area */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-0 inset-y-0 w-1/6 md:w-32 flex items-center justify-start px-4 md:px-8 text-white/50 hover:text-white hover:bg-gradient-to-r from-black/50 to-transparent transition-all z-40 group focus:outline-none"
            title="Previous Photo"
          >
            <div className="p-3 rounded-full bg-black/50 group-hover:scale-110 transition-transform border border-white/10">
              <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
            </div>
          </button>

          {/* Navigation Right - Full Height Clickable Area */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-0 inset-y-0 w-1/6 md:w-32 flex items-center justify-end px-4 md:px-8 text-white/50 hover:text-white hover:bg-gradient-to-l from-black/50 to-transparent transition-all z-40 group focus:outline-none"
            title="Next Photo"
          >
            <div className="p-3 rounded-full bg-black/50 group-hover:scale-110 transition-transform border border-white/10">
              <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
            </div>
          </button>

          {/* Center Image */}
          <div 
            className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 w-full h-full relative"
            onClick={closeLightbox} 
          >
            <img
              key={filteredItems[lightboxIndex].id}
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].alt}
              className="max-h-[75vh] max-w-[90vw] object-contain drop-shadow-2xl animate-fade-in"
              onClick={(e) => e.stopPropagation()} 
            />
            
            {filteredItems[lightboxIndex].desc && (
              <div className="absolute bottom-12 inset-x-0 mx-auto max-w-3xl text-center px-4" onClick={(e) => e.stopPropagation()}>
                <p className="text-white/90 bg-black/60 backdrop-blur-md p-4 md:p-6 rounded-2xl text-sm md:text-base inline-block border border-white/10 shadow-xl">
                  {filteredItems[lightboxIndex].desc}
                </p>
              </div>
            )}
          </div>
          
          {/* Photo Counter */}
          <div className="absolute bottom-4 inset-x-0 text-center text-white/50 text-xs font-medium z-50 tracking-widest uppercase">
            Photo {lightboxIndex + 1} of {filteredItems.length}
          </div>
        </div>
      )}
    </div>
  );
}