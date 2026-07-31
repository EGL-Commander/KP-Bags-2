import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Phone, Menu, X, ChevronDown, ChevronRight, MessageCircle } from 'lucide-react';
import { categories } from '../data/productsData';

const LONG_PRESS_MS = 1000;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Refs for long-press detection on "Products Catalog"
  const longPressTimer = useRef(null);
  const longPressTriggered = useRef(false);

  // Scroll handler for sticky menu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
    setActiveAccordion(null);
  }, [location]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Clean up any pending long-press timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-kp-blue-600 font-semibold'
      : 'text-kp-blue-900 hover:text-kp-blue-600';
  };

  // ── Long-press handlers for "Products Catalog" row ──
  // Tap  -> navigate to /products
  // Hold (1s) -> open the accordion dropdown, don't navigate
  const startLongPress = () => {
    longPressTriggered.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      setActiveAccordion((prev) => (prev === 'products' ? prev : 'products'));
    }, LONG_PRESS_MS);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleProductsRowClick = (e) => {
    // If the long press already fired, this click is just the "release" —
    // swallow it so we don't also navigate.
    if (longPressTriggered.current) {
      e.preventDefault();
      longPressTriggered.current = false;
      return;
    }
    // Plain tap/click -> let it navigate to /products, and close the drawer
    setIsOpen(false);
  };

  const handleChevronClick = (e) => {
    // Explicit chevron tap always just toggles the dropdown, never navigates
    e.preventDefault();
    e.stopPropagation();
    cancelLongPress();
    toggleAccordion('products');
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-kp-blue-900 text-white py-2 px-3 sm:px-6 lg:px-8 text-[11px] sm:text-sm transition-all duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-x-3 gap-y-1.5 sm:gap-2">

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 sm:gap-5 min-w-0">
            {/* Email links: hidden on xs/sm, visible md+ to save space */}
            <a
              href="mailto:sales@kpbigbags.com"
              className="flex items-center gap-1.5 hover:text-kp-blue-200 transition-colors font-medium flex-shrink-0 whitespace-nowrap"
            >
              <Mail className="w-4 h-4 text-kp-blue-300 flex-shrink-0" />
              <span>sales@kpbigbags.com</span>
            </a>
            <a
              href="mailto:info@kpBigBags.com"
              className="flex items-center gap-1.5 hover:text-kp-blue-200 transition-colors font-medium flex-shrink-0 whitespace-nowrap"
            >
              <Mail className="w-4 h-4 text-kp-blue-300 flex-shrink-0" />
              <span>info@kpbigbags.com</span>
            </a>
            {/* Phone: always visible */}
            <a
              href="tel:+918840575264"
              className="flex items-center gap-1.5 hover:text-kp-blue-200 transition-colors font-medium flex-shrink-0 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-kp-blue-300 flex-shrink-0" />
              <span>+91 88405 75264</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <a
              href="https://www.facebook.com/people/KP-BIG-BAGS/61551780760713/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-kp-blue-200 transition-all duration-300 hover:scale-110 flex-shrink-0"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a
              href="https://in.linkedin.com/in/kp-big-bags-a49b04288"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-kp-blue-200 transition-all duration-300 hover:scale-110 flex-shrink-0"
              title="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/kpbigbags?utm_source=qr&igsh=MWdhNDBqbjF1cWFjZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-400 transition-all duration-300 hover:scale-110 flex-shrink-0"
              title="Instagram"
            >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current"
              viewBox="0 0 24 24"
            >
            <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.25-3.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/>
            </svg>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=918840575264&text=KP%20Big%20Bags"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:text-green-300 transition-all duration-300 hover:scale-110 font-medium flex-shrink-0"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 fill-current flex-shrink-0" />
              <span className="hidden md:inline text-xs">WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isSticky
            ? 'fixed top-0 left-0 bg-white/95 shadow-lg shadow-kp-blue-900/10 glass-header py-1.5'
            : 'relative bg-white py-4 border-b border-kp-blue-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group focus:outline-none min-w-0">
            <img
              src="/logo.jpg"
              alt="KP BIG BAGS Logo"
              className="w-[48px] sm:w-[60px] h-auto object-contain transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-kp-blue-900 leading-none truncate">
                KP BIG BAGS
              </span>
              {/* Subtitle hidden on very small screens */}
              <span className="hidden sm:block text-[9px] sm:text-[10px] font-semibold text-red-600 uppercase tracking-widest mt-1">
                FIBC &amp; Industrial Packaging
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link to="/" className={`text-sm xl:text-base font-medium transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/about" className={`text-sm xl:text-base font-medium transition-colors ${isActive('/about')}`}>About Us</Link>

            {/* Mega Dropdown for Products */}
            <div className="relative group/mega">
              <Link to="/products"
                  className={`flex items-center gap-1 text-sm xl:text-base font-medium transition-colors focus:outline-none cursor-pointer py-2 ${isActive('/products')}`}>
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/mega:rotate-180" />
              </Link>

              {/* Mega Menu Dropdown — viewport-safe width */}
              <div
                className={`
                  absolute top-full
                  hidden group-hover/mega:grid
                  grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6
                  bg-white rounded-xl shadow-2xl mega-menu-shadow border border-kp-blue-100
                  p-5 sm:p-8
                  animate-slide-down z-50
                  max-w-[95vw] w-[min(900px,95vw)] xl:w-[min(1000px,95vw)]
                  max-h-[80vh] overflow-y-auto
                  left-1/2 -translate-x-1/2
                `}
                style={{ right: 'auto' }}
              >
                {categories.map((cat) => (
                  <div key={cat.id} className="flex flex-col">
                    <Link
                      to={`/products?category=${cat.id}`}
                      className="text-sm font-bold text-kp-blue-700 hover:text-kp-blue-600 border-b border-kp-blue-50 pb-2 mb-2 tracking-wide uppercase"
                    >
                      {cat.name}
                    </Link>
                    <ul className="flex flex-col gap-1.5">
                      {cat.subcategories.slice(0, 5).map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            to={`/product/${sub.slug}`}
                            className="text-xs text-slate-600 hover:text-kp-blue-600 hover:pl-1 transition-all duration-200 block truncate"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                      {cat.subcategories.length > 5 && (
                        <li>
                          <Link
                            to={`/products?category=${cat.id}`}
                            className="text-xs text-kp-blue-400 font-semibold hover:text-kp-blue-600 hover:pl-1 transition-all duration-200 block"
                          >
                            View All ({cat.subcategories.length})...
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/quality" className={`text-sm xl:text-base font-medium transition-colors ${isActive('/quality')}`}>Quality</Link>
            <Link to="/infrastructure" className={`text-sm xl:text-base font-medium transition-colors ${isActive('/infrastructure')}`}>Infrastructure</Link>
            <Link to="/gallery" className={`text-sm xl:text-base font-medium transition-colors ${isActive('/gallery')}`}>Gallery</Link>
            <Link
              to="/contact"
              className="bg-kp-blue-600 hover:bg-kp-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md shadow-kp-blue-600/10 hover:shadow-kp-blue-600/25 hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="lg:hidden relative z-[70] text-kp-blue-900 hover:text-kp-blue-600 focus:outline-none p-1.5 rounded-lg border border-kp-blue-100 hover:bg-kp-blue-50 transition-colors flex-shrink-0"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer Backdrop (rendered outside <header> so it always sits above it) ── */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Slide-in Navigation Drawer ── */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 w-[85vw] max-w-sm bg-white shadow-2xl border-l border-kp-blue-100 z-[65] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">

          {/* Mobile Drawer Header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-kp-blue-100 flex-shrink-0">
            <span className="font-bold text-kp-blue-900 text-base">Navigation</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="text-kp-blue-900 hover:text-kp-blue-600 focus:outline-none p-1.5 rounded-lg hover:bg-kp-blue-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation List */}
          <div className="flex-1 overflow-y-auto overscroll-contain py-4 px-4 space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-3 text-base font-semibold text-kp-blue-900 hover:bg-kp-blue-50 hover:text-kp-blue-600 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-3 text-base font-semibold text-kp-blue-900 hover:bg-kp-blue-50 hover:text-kp-blue-600 rounded-lg transition-colors"
            >
              About Us
            </Link>

            {/* Products Accordion Section */}
            <div className="space-y-1">
              <div
                className="w-full flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-kp-blue-50 transition-colors select-none"
              >
                <Link
                  to="/products"
                  onClick={handleProductsRowClick}
                  onMouseDown={startLongPress}
                  onMouseUp={cancelLongPress}
                  onMouseLeave={cancelLongPress}
                  onTouchStart={startLongPress}
                  onTouchEnd={cancelLongPress}
                  onTouchCancel={cancelLongPress}
                  onContextMenu={(e) => e.preventDefault()}
                  className="flex-1 text-base font-semibold text-kp-blue-900 hover:text-kp-blue-600"
                >
                  Products Catalog
                </Link>
                <button
                  type="button"
                  onClick={handleChevronClick}
                  aria-label={activeAccordion === 'products' ? 'Collapse product categories' : 'Expand product categories'}
                  aria-expanded={activeAccordion === 'products'}
                  className="p-1.5 -mr-1.5 rounded-md hover:bg-kp-blue-100 focus:outline-none"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                      activeAccordion === 'products' ? 'rotate-180 text-kp-blue-600' : 'text-kp-blue-900'
                    }`}
                  />
                </button>
              </div>
            

              {activeAccordion === 'products' && (
                <div className="ml-2 mr-1 py-2 px-2 space-y-3 bg-kp-blue-50/50 rounded-lg border border-kp-blue-50/70">
                  {categories.map((cat) => (
                    <div key={cat.id} className="space-y-1">
                      <div className="w-full flex justify-between items-center py-1.5 px-2">
                        <Link
                          to={`/products?category=${cat.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex-1 text-sm font-bold text-kp-blue-700 hover:text-kp-blue-600"
                        >
                          {cat.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleAccordion(`subcat-${cat.id}`)}
                          aria-label={activeAccordion === `subcat-${cat.id}` ? `Collapse ${cat.name}` : `Expand ${cat.name}`}
                          aria-expanded={activeAccordion === `subcat-${cat.id}`}
                          className="p-1 -mr-1 rounded-md hover:bg-kp-blue-100 focus:outline-none flex-shrink-0"
                        >
                          <ChevronRight
                            className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 ${
                              activeAccordion === `subcat-${cat.id}` ? 'rotate-90 text-kp-blue-600' : 'text-kp-blue-700'
                            }`}
                          />
                        </button>
                      </div>

                      {activeAccordion === `subcat-${cat.id}` && (
                        <div className="pl-3 py-1 space-y-1 bg-white rounded border border-kp-blue-50/80">
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              to={`/product/${sub.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="block py-1.5 px-2 text-xs text-slate-600 hover:text-kp-blue-600 hover:bg-kp-blue-50/30 rounded"
                            >
                              {sub.name}
                            </Link>
                          ))}
                          <Link
                            to={`/products?category=${cat.id}`}
                            onClick={() => setIsOpen(false)}
                            className="block py-1.5 px-2 text-xs text-kp-blue-500 font-bold hover:text-kp-blue-600"
                          >
                            Explore All...
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/quality"
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-3 text-base font-semibold text-kp-blue-900 hover:bg-kp-blue-50 hover:text-kp-blue-600 rounded-lg transition-colors"
            >
              Quality Standards
            </Link>
            <Link
              to="/infrastructure"
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-3 text-base font-semibold text-kp-blue-900 hover:bg-kp-blue-50 hover:text-kp-blue-600 rounded-lg transition-colors"
            >
              Infrastructure
            </Link>
            <Link
              to="/gallery"
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-3 text-base font-semibold text-kp-blue-900 hover:bg-kp-blue-50 hover:text-kp-blue-600 rounded-lg transition-colors"
            >
              Media Gallery
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-3 text-base font-semibold text-kp-blue-900 hover:bg-kp-blue-50 hover:text-kp-blue-600 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Drawer Footer */}
          <div className="px-5 py-4 border-t border-kp-blue-100 bg-kp-blue-50/30 space-y-2 flex-shrink-0">
            <a
              href="tel:+918840575264"
              className="flex items-center gap-2 text-sm text-kp-blue-900 font-semibold hover:text-kp-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-kp-blue-500 flex-shrink-0" />
              <span>+91 88405 75264</span>
            </a>
            <a
              href="mailto:sales@kpbigbags.com"
              className="flex items-center gap-2 text-xs text-slate-600 hover:text-kp-blue-600 transition-colors"
            >
              <Mail className="w-4 h-4 text-kp-blue-500 flex-shrink-0" />
              <span>sales@kpbigbags.com</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}