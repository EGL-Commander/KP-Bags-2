import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { categories } from '../data/productsData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Group companies data — update Company 3 with real details when available
  const groupCompanies = [
    {
      id: 'kp-bigbags',
      name: 'KP BIG BAGS',
      logo: '/logo.jpg',
      logoHref: 'https://kpbigbags.com/',
      address: 'Orchid Villa, Reliance Petrol Pump, Sanand-Viramgam Highway, Dist-Ahmedabad, Gujarat-382110',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Orchid+Villa+Reliance+Petrol+Pump+Sanand-Viramgam+Highway+Dist-Ahmedabad+Gujarat-382110',
      phone: '+91 88405 75264',
      phoneHref: 'tel:+918840575264',
      email: 'sales@kpbigbags.com',
      social: {},
    },
    {
      id: 'maple-eco-packs',
      name: 'Maple Eco Packs Inc',
      logo: '/logo 2.jpg',
      address: '36, Ball Crescent, Whitby, L1P 1W6, Ontario, Canada.',
      mapUrl: 'https://mapleecopacks.ca/#',
      phone: '+1 437 875 1203',
      phoneHref: 'tel:+14378751203',
      email: 'info@mapleecopacks.ca',
      social: {},
    },
    {
      id: 'Big Bags Uruguay',
      name: 'BIG BAGS Uruguay', // TODO: replace with actual company name
      logo: '/logo 3.jpg', // TODO: replace with actual logo path
      address: 'Jose Pedro Varela 703, Apto 1,Las Piedras, Canelones, Uruguay', // TODO: replace with actual address
      mapUrl: '#',
      phone: '+598 94407297', // TODO: replace with actual phone
      phoneHref: 'tel:+59894407297',
      email: 'Ventas@bigbagsuruguay.com', // TODO: replace with actual email
      social: {},
    },
  ];

  return (
    <footer className="bg-kp-blue-50 border-t border-kp-blue-100 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Column 1: Brand Profile */}
        <div className="flex flex-col gap-4">
          <Link to="/" onClick={handleScrollToTop} className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="KP BIG BAGS"
              className="w-[60px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-kp-blue-900 leading-none">KP BIG BAGS</span>
              <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider mt-1">FIBC Manufacturer & Exporter</span>
            </div>
          </Link>
          <p className="text-sm text-slate-600 leading-relaxed mt-2">
            An ISO 9001:2015 certified manufacturer of high-quality Flexible Intermediate Bulk Containers (FIBC) jumbo bags and industrial packaging materials based in Gujarat, India.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://www.facebook.com/people/KP-BIG-BAGS/61551780760713/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-kp-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a
              href="https://in.linkedin.com/in/kp-big-bags-a49b04288"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-kp-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
                href="https://api.whatsapp.com/send?phone=918840575264"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-9 h-9 rounded-full bg-white flex items-center justify-center border border-kp-blue-100 hover:bg-green-500 transition-all duration-300 hover:scale-105"
                aria-label="WhatsApp"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 text-green-500 group-hover:text-white transition-colors duration-300"
                fill="currentColor"
              >
              <path d="M16.004 3C8.82 3 3 8.82 3 16.004c0 2.282.6 4.51 1.738 6.48L3 29l6.688-1.718a13.01 13.01 0 006.316 1.622C23.18 28.904 29 23.184 29 16.004 29 8.82 23.18 3 16.004 3zm0 23.575a10.51 10.51 0 01-5.36-1.47l-.384-.228-3.968 1.02 1.058-3.87-.25-.397a10.49 10.49 0 01-1.616-5.626c0-5.81 4.727-10.538 10.52-10.538 5.797 0 10.52 4.728 10.52 10.538 0 5.81-4.723 10.57-10.52 10.57zm5.77-7.878c-.316-.158-1.87-.923-2.16-1.03-.29-.106-.5-.158-.71.158-.21.317-.815 1.03-.998 1.24-.184.21-.368.237-.684.079-.316-.158-1.334-.49-2.54-1.564-.938-.836-1.57-1.87-1.754-2.186-.184-.317-.02-.488.138-.646.143-.142.316-.368.474-.553.158-.184.21-.316.316-.526.105-.21.053-.395-.027-.553-.079-.158-.71-1.712-.972-2.344-.256-.615-.517-.53-.71-.54h-.605c-.21 0-.553.079-.842.395-.29.316-1.105 1.08-1.105 2.634s1.132 3.054 1.29 3.265c.158.21 2.228 3.4 5.4 4.766.755.326 1.344.52 1.803.666.758.242 1.448.208 1.993.126.608-.09 1.87-.764 2.134-1.5.263-.737.263-1.37.184-1.5-.079-.132-.289-.21-.605-.368z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/kpbigbags?utm_source=qr&igsh=MWdhNDBqbjF1cWFjZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
            >
            <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5A3.75 3.75 0 017.75 4zm8.75 1a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
            </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Company Links */}
        <div className="flex flex-col gap-4 md:pl-6">
          <h4 className="text-base font-bold text-kp-blue-900 border-b border-kp-blue-100 pb-2 uppercase tracking-wider">Company Links</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
            <li>
              <Link to="/about" onClick={handleScrollToTop} className="hover:text-kp-blue-600 transition-colors flex items-center gap-1">
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/quality" onClick={handleScrollToTop} className="hover:text-kp-blue-600 transition-colors flex items-center gap-1">
                <span>Quality Standards</span>
              </Link>
            </li>
            <li>
              <Link to="/infrastructure" onClick={handleScrollToTop} className="hover:text-kp-blue-600 transition-colors flex items-center gap-1">
                <span>Infrastructure</span>
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={handleScrollToTop} className="hover:text-kp-blue-600 transition-colors flex items-center gap-1">
                <span>Media Gallery</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={handleScrollToTop} className="hover:text-kp-blue-600 transition-colors flex items-center gap-1">
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Our Products */}
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-bold text-kp-blue-900 border-b border-kp-blue-100 pb-2 uppercase tracking-wider">Our Products</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <Link to={`/products?category=${cat.id}`} onClick={handleScrollToTop} className="hover:text-kp-blue-600 transition-colors truncate block">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products" onClick={handleScrollToTop} className="text-kp-blue-600 font-bold hover:text-kp-blue-800 transition-colors flex items-center gap-0.5">
                <span>View Full Catalog</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-bold text-kp-blue-900 border-b border-kp-blue-100 pb-2 uppercase tracking-wider">Contact Info</h4>
          <ul className="flex flex-col gap-3.5 text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-kp-blue-600 shrink-0 mt-0.5" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Orchid+Villa+Reliance+Petrol+Pump+Sanand-Viramgam+Highway+Dist-Ahmedabad+Gujarat-382110"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-kp-blue-600 transition-colors leading-relaxed"
              >
                Orchid Villa, Reliance Petrol Pump, Sanand-Viramgam Highway, Dist-Ahmedabad, Gujarat-382110
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-kp-blue-600 shrink-0" />
              <a href="tel:+918840575264" className="hover:text-kp-blue-600 transition-colors font-medium">+91 88405 75264</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-kp-blue-600 shrink-0" />
              <a href="mailto:sales@kpbigbags.com" className="hover:text-kp-blue-600 transition-colors font-medium">sales@kpbigbags.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Group Companies Strip: KP Big Bags / Maple Eco Packs / Company 3 */}
<div className="max-w-7xl mx-auto border-t border-kp-blue-100 pt-12 mb-8">
  <div className="text-center mb-10">
    <h4 className="text-base font-bold text-kp-blue-900 uppercase tracking-wider">
      Our Group Companies
    </h4>
    <div className="w-14 h-[3px] bg-kp-blue-600 mx-auto mt-3 rounded-full" />
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
    {groupCompanies.map((company) => (
      <div
        key={company.id}
        className="h-full flex flex-col items-center text-center gap-3 bg-white rounded-2xl border border-kp-blue-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-kp-blue-300 transition-all duration-300"
      >
        {/* Fixed-size logo box — every logo (tall, wide, square, or one with
            extra built-in padding) renders at the exact same visual size */}
        <div className="h-20 w-[160px] flex items-center justify-center overflow-hidden mb-1">
          <img
            src={company.logo}
            alt={company.name}
            className="max-h-full max-w-full w-auto h-auto object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <span className="text-sm font-bold text-kp-blue-900 tracking-wide">
          {company.name}
        </span>

        <div className="w-8 h-px bg-kp-blue-100 my-1" />

        <a
          href={company.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 text-xs text-slate-600 hover:text-kp-blue-600 transition-colors leading-relaxed"
        >
          <MapPin className="w-4 h-4 text-kp-blue-600 shrink-0 mt-0.5" />
          <span>{company.address}</span>
        </a>

        <a
          href={company.phoneHref}
          className="flex items-center gap-2 text-xs text-slate-600 hover:text-kp-blue-600 transition-colors font-medium"
        >
          <Phone className="w-4 h-4 text-kp-blue-600 shrink-0" />
          <span>{company.phone}</span>
        </a>

        <a
          href={`mailto:${company.email}`}
          className="flex items-center gap-2 text-xs text-slate-600 hover:text-kp-blue-600 transition-colors font-medium"
        >
          <Mail className="w-4 h-4 text-kp-blue-600 shrink-0" />
          <span>{company.email}</span>
        </a>

        {/* Social icons — only rendered if provided. mt-auto keeps this row
            pinned to the bottom so every card lines up, even if one company
            has no socials yet. */}
        {(company.social.facebook || company.social.linkedin || company.social.whatsapp || company.social.instagram) && (
          <div className="flex items-center gap-3 mt-auto pt-3">
            {company.social.facebook && (
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-kp-blue-50 flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-kp-blue-600 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
            )}
            {company.social.linkedin && (
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-kp-blue-50 flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-kp-blue-600 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
            {company.social.whatsapp && (
              <a
                href={company.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-kp-blue-50 flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-green-500 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current text-green-500 hover:text-white" />
              </a>
            )}
            {company.social.instagram && (
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-kp-blue-50 flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
</div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-kp-blue-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p className="text-xs sm:text-sm text-slate-500">
          &copy; {currentYear} KP Bigbags. All Rights Reserved.
        </p>
        <p className="text-xs text-slate-400">
          Designed for excellence in bulk packaging solutions. An ISO 9001:2015 Registered Facility.
        </p>
      </div>
    </footer>
  );
}