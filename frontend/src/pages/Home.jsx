import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ShieldCheck, Award, Zap, Clock, Compass, Target, Heart, Globe } from 'lucide-react';
import { categories } from '../data/productsData';
import ProductGraphic from '../components/ProductGraphic';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * HERO SLIDER DATA
 * ─────────────────────────────────────────────────────────────────────────
 * `focalMobile / focalTablet / focalDesktop` control background-position
 * per breakpoint so the important product/subject in each photo stays
 * visible instead of being cropped out on narrow mobile screens.
 * Tune the percentages per-image if the product isn't perfectly centered.
 */
const heroSlides = [
  {
    id: 'fibc',
    badge: 'ISO 9001:2015 Certified',
    title: 'Premium FIBC Jumbo Bags Manufacturer',
    subtitle:
      'High-performance Flexible Intermediate Bulk Containers engineered for secure global dry bulk transport.',
    cta: 'Explore FIBC Bags',
    link: '/products?category=fibc',
    image: '/update-banner-1.png',
    imageAlt:
      'Workers manufacturing and quality-checking FIBC jumbo bags on the KP Big Bags factory floor',
    focalMobile: 'center 20%',
    focalTablet: 'center 30%',
    focalDesktop: 'center 40%',
  },
  {
    id: 'bopp',
    badge: 'ISO 9001:2015 Certified',
    title: 'BOPP Woven Sacks & Retail Packaging',
    subtitle:
      'Multi-color reverse-printed BOPP laminated packaging bags offering premium shelf aesthetics and damp protection.',
    cta: 'Browse BOPP Bags',
    link: '/products?category=bopp-woven',
    image: '/Homepage-banner2.jpeg',
    imageAlt: 'Aerial view of colorful stacked shipping containers at a port',
    focalMobile: 'center 25%',
    focalTablet: 'center 35%',
    focalDesktop: 'center center',
  },
  {
    id: 'agro',
    badge: 'ISO 9001:2015 Certified',
    title: 'Technical Agro & Geo Textiles',
    subtitle:
      'High-tensile ground covers, anti-hail nets, shade screens, and woven geotextiles for soil engineering.',
    cta: 'Discover Agro-Geo Products',
    link: '/products?category=agro-textile',
    image: '/Homepage-banner3.jpeg',
    imageAlt:
      'Cargo ship loaded with containers sailing across the open sea, representing global export reach',
    focalMobile: 'center 30%',
    focalTablet: 'center center',
    focalDesktop: 'center center',
  },
];

const HERO_AUTOPLAY_DELAY = 6000;

/**
 * ─────────────────────────────────────────────────────────────────────────
 * PREMIUM HERO SLIDER
 * ─────────────────────────────────────────────────────────────────────────
 * - Full-bleed background-image slides (never crops out the product)
 * - Responsive focal point per breakpoint via CSS custom properties
 * - Light, directional overlay (photo always stays visible)
 * - Content always vertically centered, sits directly on the image
 * - Ken Burns zoom + staggered text fade-in animation
 * - Arrow navigation (tablet+), swipe support (mobile), dot indicators
 * - 100dvh height so mobile browser chrome never breaks the layout
 */
function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback((idx) => {
    setCurrentSlide(((idx % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);

  const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);
  const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);

  // ── Autoplay ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, HERO_AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  // ── Swipe support for mobile ─────────────────────────────────────────
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev();
    }
  };

  return (
    <section
      className="relative w-full h-[100dvh] min-h-[560px] max-h-[960px] lg:h-screen overflow-hidden bg-kp-blue-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured product categories"
    >
      {/* Local keyframes: slow Ken Burns zoom + text rise-in + responsive focal point */}
      <style>{`
        @keyframes kpHeroZoom {
          0%   { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes kpHeroFadeUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .kp-hero-zoom { animation: kpHeroZoom 8s ease-out forwards; }
        .kp-hero-fade-up { animation: kpHeroFadeUp 0.8s ease-out forwards; }
        .kp-hero-bg { background-position: var(--focal-mobile); }
        @media (min-width: 640px) {
          .kp-hero-bg { background-position: var(--focal-tablet); }
        }
        @media (min-width: 1024px) {
          .kp-hero-bg { background-position: var(--focal-desktop); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kp-hero-zoom, .kp-hero-fade-up { animation: none; }
        }
      `}</style>

      {/* Slides */}
      {heroSlides.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* Full-bleed background image — always covers the section,
                focal point shifts responsively so the product is never cropped out */}
            <div
              className={`kp-hero-bg absolute inset-0 bg-cover will-change-transform ${
                isActive ? 'kp-hero-zoom' : ''
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                '--focal-mobile': slide.focalMobile,
                '--focal-tablet': slide.focalTablet,
                '--focal-desktop': slide.focalDesktop,
              }}
              role="img"
              aria-label={slide.imageAlt}
            />

            {/* Premium light overlay — enough contrast for text, photo stays visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent hidden sm:block" />
          </div>
        );
      })}

      {/* Content — always vertically centered, sits directly on the image */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12">
          <div key={currentSlide} className="max-w-xl space-y-4 sm:space-y-5 md:space-y-6">
            <span className="kp-hero-fade-up inline-block bg-red-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded uppercase tracking-widest shadow-md">
              {heroSlides[currentSlide].badge}
            </span>

            <h1
              className="kp-hero-fade-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
              style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
            >
              {heroSlides[currentSlide].title}
            </h1>

            <p
              className="kp-hero-fade-up text-sm sm:text-lg md:text-xl text-white font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
              style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
            >
              {heroSlides[currentSlide].subtitle}
            </p>

            <div
              className="kp-hero-fade-up pt-1 sm:pt-2"
              style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
            >
              <Link
                to={heroSlides[currentSlide].link}
                className="inline-flex items-center gap-2 bg-white hover:bg-kp-blue-50 text-kp-blue-900 px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{heroSlides[currentSlide].cta}</span>
                <ArrowRight className="w-4 h-4 text-kp-blue-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows (tablet and up) */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden sm:flex absolute z-30 left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-white/40 bg-black/20 backdrop-blur-sm items-center justify-center text-white hover:bg-white/20 hover:border-white transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden sm:flex absolute z-30 right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-white/40 bg-black/20 backdrop-blur-sm items-center justify-center text-white hover:bg-white/20 hover:border-white transition-all duration-300"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute z-30 bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {heroSlides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            aria-current={idx === currentSlide}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${
              idx === currentSlide
                ? 'w-8 sm:w-9 bg-white'
                : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * CountUp component for the stats section — animates when scrolled into view.
 */
function StatCounter({ target, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = parseInt(target, 10);
          if (isNaN(end)) return;
          const totalFrames = Math.round(duration / 16); // ~60fps
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quad
            const currentCount = Math.round(end * (progress * (2 - progress)));
            setCount(currentCount);

            if (frame === totalFrames) {
              clearInterval(counter);
              setCount(end);
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, duration]);

  return (
    <span ref={elementRef} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-kp-blue-600 block mb-1">
      {count}{suffix}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. About Us snippet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">Welcome to KP Big Bags</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-kp-blue-900 leading-tight">
                Pioneering Industrial Bulk Packaging Globally
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                <strong className="font-semibold text-kp-blue-950">KP BIG BAGS</strong> is an ISO 9001:2015 certified company located in Ahmedabad, Gujarat, India, and one of the most reputable manufacturers of FIBC bags and industrial packaging products. Common Types of FIBC Bags by Application
U-Panel Bags – General-purpose bulk materials.
Circular Bags – Powder and granular products.
Baffle (Q) Bags – Maximize container and warehouse space.
Ventilated Bags – Potatoes, onions, firewood, and other produce requiring airflow.
UN Certified Bags – Hazardous materials.
Conductive (Type C) & Antistatic (Type D) Bags – Flammable powders and explosive environments.
Food-Grade FIBCs – Food ingredients and agricultural products.

FIBC bags are widely used because they are lightweight, cost-effective, reusable (where appropriate), recyclable, and capable of carrying loads ranging from 500 kg to 2,000 kg or more, depending on their design and safety factor. and minerals with high quality, durability, and customization.
              </p>

              {/* Highlights cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: <Zap className="w-5 h-5" />, title: "Innovation Focused", desc: "Developing static dissipative and space-saving baffle bag designs." },
                  { icon: <ShieldCheck className="w-5 h-5" />, title: "Absolute Reliability", desc: "Rigorous mechanical tests ensuring 5:1 and 6:1 Safety Factors." },
                  { icon: <Clock className="w-5 h-5" />, title: "On-time Delivery", desc: "Streamlined logistics guaranteeing prompt international shipping." },
                  { icon: <Award className="w-5 h-5" />, title: "Quality Conscious", desc: "ISO compliance testing on every single manufactured batch." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-kp-blue-50/50 hover:bg-kp-blue-50 border border-kp-blue-100 p-4 rounded-xl transition-all duration-300">
                    <div className="p-2 rounded-lg bg-kp-blue-100 text-kp-blue-600 h-9 w-9 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-kp-blue-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-kp-blue-600 hover:bg-kp-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md shadow-kp-blue-600/10 hover:shadow-kp-blue-600/25"
                >
                  <span>Read More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Graphic/Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-kp-blue-50 rounded-3xl border border-kp-blue-100 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Visual Graphic representation */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-kp-blue-100/40 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-kp-blue-200/20 rounded-full blur-3xl" />

                <div className="z-10 bg-white p-4 rounded-2xl shadow-sm border border-kp-blue-50 self-start">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">ESTABLISHED</span>
                  <span className="text-2xl font-extrabold text-kp-blue-700">Ahmedabad, IN</span>
                </div>

                {/* SVG of ISO check logo */}
                <div className="z-10 flex justify-center items-center py-6">
                  <svg viewBox="0 0 100 100" className="w-32 h-32 text-kp-blue-600">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="40" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
                    <path d="M35 50 L45 60 L65 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="50" y="80" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor" tracking="wide">ISO 9001:2015</text>
                  </svg>
                </div>

                <div className="z-10 bg-kp-blue-900 text-white p-4 rounded-2xl shadow-md self-end text-left w-full flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-kp-blue-300 uppercase tracking-wider block">Global Reach</span>
                    <span className="text-sm font-bold">25+ Export Countries</span>
                  </div>
                  <Globe className="w-5 h-5 text-kp-blue-300" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Featured Products Categories */}
      <section className="py-20 bg-kp-blue-50/50 border-y border-kp-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">Product Catalog</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-kp-blue-900">Featured Packaging Categories</h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
              Explore our diverse range of heavy-duty industrial containers, specialized crop protection fabrics, high-strength yarns, and custom protection tarpaulins.
            </p>
          </div>

          {/* Product Grid - 8 Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="group bg-white border border-kp-blue-100 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-kp-blue-200 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Category icon header mapping */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-xl bg-kp-blue-50 text-kp-blue-600 flex items-center justify-center group-hover:bg-kp-blue-600 group-hover:text-white transition-colors duration-300">
                      <span className="font-extrabold text-lg">0{idx + 1}</span>
                    </div>
                    <div className="w-12 h-12 bg-slate-50 rounded-xl p-1 border border-slate-100 group-hover:bg-white transition-all duration-300">
                      <ProductGraphic categoryId={cat.id} className="w-full h-full" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-kp-blue-900 mb-2 group-hover:text-kp-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-50 mt-6 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">{cat.subcategories.length} Products</span>
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-kp-blue-600 hover:text-kp-blue-800 transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Infrastructure Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Photo */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative w-full rounded-2xl overflow-hidden border border-kp-blue-100 shadow-xl">
                <img
                  src="/home-infrastructure.png"
                  alt="KP Big Bags manufacturing facility exterior with FIBC production process icons: circular weaving, tape extrusion, sewing, printing, QC testing, warehouse, container loading and skilled workforce"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="text-left space-y-6 order-1 lg:order-2">
              <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">World-Class Facility</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-kp-blue-900 leading-tight">
                State-of-the-Art Integrated Infrastructure
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-light">
                Our advanced manufacturing facility in Ahmedabad, Gujarat, operates under high cleanroom standards. From polymer extrusion and heavy-duty circular weaving looms to precise automated cutting and sewing lines, we ensure fully controlled fabrication.
              </p>
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-kp-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Food-Grade Cleanroom Facility</strong>: Clean room sewing area ensuring food and pharma-grade packaging compliance.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-kp-blue-600 shrink-0 mt-0.5" />
                  <span><strong>High Production Capacity</strong>: Capable of manufacturing over 2.5 million jumbo bags and technical textile yards annually.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-kp-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Global Logistics Connectivity</strong>: Situated in Gujarat for rapid shipping via major container ports (Mundra, Kandla).</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/infrastructure"
                  className="inline-flex items-center gap-2 bg-kp-blue-600 hover:bg-kp-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md shadow-kp-blue-600/10 hover:shadow-kp-blue-600/25"
                >
                  <span>Explore Infrastructure</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Statistics Counter Section */}
      <section className="py-16 bg-kp-blue-900 text-white relative overflow-hidden">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#4da6d9_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { target: "2018",  label: "Years of Establishment" },
              { target: "25", suffix: "+", label: "Team Workforce" },
              { target: "50", suffix: "+", label: "Clients Worldwide" },
              { target: "42", suffix: "+", label: "Countries Served" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-4 inline-block">
                  <StatCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm md:text-base text-kp-blue-200 font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Us / Mission-Vision-Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs sm:text-sm font-extrabold text-kp-blue-600 uppercase tracking-widest block">Our Foundations</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-kp-blue-900">Why Industries Trust KP Big Bags</h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
              Built on integrity, absolute compliance, and advanced custom product development, we are dedicated to protecting your valuable cargo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-kp-blue-600" />,
                title: "Our Mission",
                desc: "To deliver top-tier, zero-defect industrial packaging materials, ensuring secure handling, shipping, and storage of products for chemical, food, agricultural, and mineral markets worldwide."
              },
              {
                icon: <Compass className="w-8 h-8 text-kp-blue-600" />,
                title: "Our Vision",
                desc: "To be recognized globally as the most trusted manufacturing partner for FIBC jumbo bags, technical textiles, and high-performance polyolefin packaging rolls, leveraging green technologies."
              },
              {
                icon: <Heart className="w-8 h-8 text-kp-blue-600" />,
                title: "Our Values",
                desc: "Our pillars are Safety First, Quality Excellence, Integrity in B2B Partnerships, and Sustainable Innovation. We value our workforce and strive for continuous improvement."
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-kp-blue-50/30 border border-kp-blue-100 hover:border-kp-blue-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 text-left"
              >
                <div>
                  <div className="p-3 rounded-xl bg-kp-blue-100/50 inline-block mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-kp-blue-900 mb-4">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">{card.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-bold text-kp-blue-600 hover:text-kp-blue-800 transition-colors">
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call-to-action banner */}
      <section className="bg-kp-blue-50 border-t border-b border-kp-blue-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-kp-blue-900">
            Ready to secure your cargo with KP BIG BAGS?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-light">
            Contact our B2B sales office today to request custom product quotes, get technical drawings, or inquire about bulk pricing parameters.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-kp-blue-600 hover:bg-kp-blue-700 text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-md shadow-kp-blue-600/10 hover:shadow-kp-blue-600/25 hover:-translate-y-0.5"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}