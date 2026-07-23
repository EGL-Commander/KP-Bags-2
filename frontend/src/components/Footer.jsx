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
      address: 'Orchid Villa, Reliance Petrol Pump, Sanand-Viramgam Highway, Dist-Ahmedabad, Gujarat-382110',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Orchid+Villa+Reliance+Petrol+Pump+Sanand-Viramgam+Highway+Dist-Ahmedabad+Gujarat-382110',
      phone: '+91 88405 75264',
      phoneHref: 'tel:+918840575264',
      email: 'sales@kpbigbags.com',
      social: {
        facebook: 'https://www.facebook.com/people/KP-BIG-BAGS/61551780760713/',
        linkedin: 'https://in.linkedin.com/in/kp-big-bags-a49b04288',
        whatsapp: 'https://api.whatsapp.com/send?phone=918840575264&text=KP%20Big%20Bags',
      },
    },
    {
      id: 'maple-eco-packs',
      name: 'Maple Eco Packs Inc',
      logo: '/maple eco logo-2.png',
      address: '36, Ball Crescent, Whitby, L1P 1W6, Ontario, Canada.',
      mapUrl: 'https://mapleecopacks.ca/#',
      phone: '+1 437 875 1203',
      phoneHref: 'tel:+14378751203',
      email: 'info@mapleecopacks.ca',
      social: {},
    },
    {
      id: 'company-3',
      name: 'Company 3', // TODO: replace with actual company name
      logo: '/company-3-logo.png', // TODO: replace with actual logo path
      address: 'Address to be updated', // TODO: replace with actual address
      mapUrl: '#',
      phone: '+00 000 000 0000', // TODO: replace with actual phone
      phoneHref: 'tel:+',
      email: 'info@company3.com', // TODO: replace with actual email
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
              href="https://api.whatsapp.com/send?phone=918840575264&text=KP%20Big%20Bags"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current text-green-500 hover:text-white" />
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
      <div className="max-w-7xl mx-auto border-t border-kp-blue-100 pt-10 mb-8">
        <h4 className="text-center text-base font-bold text-kp-blue-900 uppercase tracking-wider mb-8">Our Group Companies</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {groupCompanies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col items-center text-center gap-3 bg-white rounded-xl border border-kp-blue-100 p-6"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-14 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="text-sm font-bold text-kp-blue-900">{company.name}</span>

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

              {/* Social icons — only rendered if provided */}
              {(company.social.facebook || company.social.linkedin || company.social.whatsapp) && (
                <div className="flex items-center gap-3 mt-1">
                  {company.social.facebook && (
                    <a
                      href={company.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-kp-blue-50 flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-kp-blue-600 hover:text-white transition-all duration-300"
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
                      className="w-8 h-8 rounded-full bg-kp-blue-50 flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-kp-blue-600 hover:text-white transition-all duration-300"
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
                      className="w-8 h-8 rounded-full bg-kp-blue-50 flex items-center justify-center text-kp-blue-900 border border-kp-blue-100 hover:bg-green-500 hover:text-white transition-all duration-300"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current text-green-500 hover:text-white" />
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