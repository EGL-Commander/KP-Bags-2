import React from 'react';

export default function ProductGraphic({ categoryId, slug, className = "w-full h-full" }) {
  // Render high-quality crisp SVGs representing each product category
  if (categoryId === 'fibc') {
    return (
      <svg viewBox="0 0 200 200" className={`${className} text-kp-blue-600`} fill="none" stroke="currentColor" strokeWidth="2.5">
        {/* Corner loops */}
        <path d="M60 70 C60 35, 75 35, 75 70" strokeWidth="3" />
        <path d="M125 70 C125 35, 140 35, 140 70" strokeWidth="3" />
        {/* FIBC Jumbo Bag outline */}
        <rect x="50" y="70" width="100" height="95" rx="8" fill="currentColor" fillOpacity="0.05" />
        {/* Top filling spout */}
        <rect x="85" y="50" width="30" height="20" fill="currentColor" fillOpacity="0.1" />
        {/* Safety stitch seams */}
        <path d="M55 70 L55 165" strokeDasharray="3 3" strokeOpacity="0.6" />
        <path d="M145 70 L145 165" strokeDasharray="3 3" strokeOpacity="0.6" />
        {/* Discharge spout at bottom */}
        <rect x="88" y="165" width="24" height="15" fill="currentColor" fillOpacity="0.1" />
        {/* Grid pattern on bag */}
        <line x1="50" y1="110" x2="150" y2="110" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="50" y1="130" x2="150" y2="130" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="80" y1="70" x2="80" y2="165" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="120" y1="70" x2="120" y2="165" strokeOpacity="0.2" strokeWidth="1" />
      </svg>
    );
  }

  if (categoryId === 'bopp-woven') {
    return (
      <svg viewBox="0 0 200 200" className={`${className} text-kp-blue-600`} fill="none" stroke="currentColor" strokeWidth="2.5">
        {/* BOPP bag body */}
        <path d="M60 40 L140 40 L130 170 L70 170 Z" fill="currentColor" fillOpacity="0.05" />
        {/* Bottom stitching */}
        <path d="M65 170 L135 170" strokeWidth="4" />
        {/* Graphic elements to make it look laminated */}
        <path d="M62 80 L138 80 L136 110 L64 110 Z" fill="currentColor" fillOpacity="0.15" stroke="none" />
        {/* Handles if specialty */}
        {slug?.includes('handle') || slug?.includes('d-cut') ? (
          <path d="M85 30 Q100 15 115 30" strokeWidth="3" />
        ) : (
          <path d="M70 40 L130 40" strokeWidth="2" strokeDasharray="2 2" />
        )}
        <line x1="75" y1="95" x2="125" y2="95" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="95" r="8" fill="white" stroke="currentColor" strokeWidth="1" />
        <text x="100" y="98" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none" textAnchor="middle">KP</text>
      </svg>
    );
  }

  if (categoryId === 'agro-textile') {
    return (
      <svg viewBox="0 0 200 200" className={`${className} text-emerald-600`} fill="none" stroke="currentColor" strokeWidth="2.5">
        {/* Weave grid representing anti-weed mat or shade net */}
        <rect x="40" y="40" width="120" height="120" rx="6" fill="currentColor" fillOpacity="0.05" />
        {/* Grid lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <React.Fragment key={i}>
            <line x1={55 + i * 15} y1="40" x2={55 + i * 15} y2="160" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="40" y1={55 + i * 15} x2="160" y2={55 + i * 15} strokeOpacity="0.4" strokeWidth="1" />
          </React.Fragment>
        ))}
        {/* Net outline */}
        <rect x="40" y="40" width="120" height="120" rx="6" strokeWidth="2" />
        {/* Green leaf icon in center */}
        <path d="M100 70 C120 90 120 110 100 130 C80 110 80 90 100 70 Z" fill="currentColor" fillOpacity="0.25" />
        <line x1="100" y1="70" x2="100" y2="130" strokeWidth="1.5" />
      </svg>
    );
  }

  if (categoryId === 'geo-textile') {
    return (
      <svg viewBox="0 0 200 200" className={`${className} text-slate-600`} fill="none" stroke="currentColor" strokeWidth="2.5">
        {/* Road/soil reinforcement layers */}
        <rect x="45" y="45" width="110" height="110" rx="4" fill="currentColor" fillOpacity="0.05" />
        {/* Layer representation */}
        <line x1="45" y1="80" x2="155" y2="80" strokeWidth="3" />
        <line x1="45" y1="120" x2="155" y2="120" strokeWidth="3" />
        {/* Silt fence pegs */}
        {slug?.includes('silt') && (
          <>
            <line x1="60" y1="45" x2="60" y2="155" strokeWidth="3" stroke="currentColor" />
            <line x1="140" y1="45" x2="140" y2="155" strokeWidth="3" stroke="currentColor" />
          </>
        )}
        {/* Structural weave */}
        <path d="M50 60 L150 70 M50 100 L150 110 M50 140 L150 150" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.7" />
      </svg>
    );
  }

  if (categoryId === 'multifilament-yarn') {
    return (
      <svg viewBox="0 0 200 200" className={`${className} text-kp-blue-600`} fill="none" stroke="currentColor" strokeWidth="2.5">
        {/* Yarn bobbin cone */}
        <polygon points="85,30 115,30 135,160 65,160" fill="currentColor" fillOpacity="0.05" />
        {/* Winding yarn effect */}
        {Array.from({ length: 12 }).map((_, i) => (
          <path 
            key={i} 
            d={`M${70 + i * 2.5} ${150 - i * 10} Q${100} ${160 - i * 10} ${130 - i * 2.5} ${150 - i * 10}`} 
            strokeOpacity="0.5" 
            strokeWidth="1.5" 
          />
        ))}
        {/* Center core pipe */}
        <line x1="100" y1="15" x2="100" y2="175" strokeWidth="5" strokeLinecap="round" />
        {/* Bobbin stand base */}
        <rect x="55" y="160" width="90" height="12" rx="2" fill="currentColor" />
      </svg>
    );
  }

  if (categoryId === 'fabric') {
    return (
      <svg viewBox="0 0 200 200" className={`${className} text-kp-blue-600`} fill="none" stroke="currentColor" strokeWidth="2.5">
        {/* Cylindrical fabric roll */}
        <ellipse cx="60" cy="100" rx="15" ry="35" fill="currentColor" fillOpacity="0.1" />
        <ellipse cx="60" cy="100" rx="5" ry="12" fill="currentColor" />
        {/* Roll body */}
        <path d="M60 65 L145 65 C155 65 160 80 160 100 C160 120 155 135 145 135 L60 135 Z" fill="currentColor" fillOpacity="0.05" />
        <line x1="60" y1="65" x2="145" y2="65" />
        <line x1="60" y1="135" x2="145" y2="135" />
        <ellipse cx="145" cy="100" rx="15" ry="35" fill="currentColor" fillOpacity="0.2" />
        {/* Hanging sheet coming off roll */}
        <path d="M135 105 L135 170 L70 170 L70 115" strokeDasharray="3 3" strokeOpacity="0.7" />
      </svg>
    );
  }

  if (categoryId === 'tarpaulin') {
    return (
      <svg viewBox="0 0 200 200" className={`${className} text-kp-blue-600`} fill="none" stroke="currentColor" strokeWidth="2.5">
        {/* Folded heavy-duty tarpaulin sheet */}
        <polygon points="50,60 140,40 160,130 70,150" fill="currentColor" fillOpacity="0.05" />
        <polygon points="50,60 140,40 160,130 70,150" strokeWidth="2.5" />
        {/* Folds */}
        <path d="M60 105 L150 85 M80 125 L145 110" strokeOpacity="0.4" />
        {/* Metallic grommets / eyelets */}
        <circle cx="58" cy="65" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
        <circle cx="132" cy="48" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
        <circle cx="78" cy="142" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
        <circle cx="152" cy="125" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
        <circle cx="105" cy="101" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
        {/* Reinforced hem edge line */}
        <path d="M54 62 L136 44 L156 128 L74 146 Z" strokeDasharray="2 2" strokeWidth="1" strokeOpacity="0.5" />
      </svg>
    );
  }

  // Other packaging accessories (e.g. PET straps, stretch film, cords)
  return (
    <svg viewBox="0 0 200 200" className={`${className} text-kp-blue-600`} fill="none" stroke="currentColor" strokeWidth="2.5">
      {/* Packaging accessory: strap coil or box */}
      <circle cx="100" cy="100" r="45" fill="currentColor" fillOpacity="0.05" />
      <circle cx="100" cy="100" r="45" />
      <circle cx="100" cy="100" r="25" fill="white" stroke="currentColor" />
      <circle cx="100" cy="100" r="10" fill="currentColor" />
      {/* Strap banding line */}
      <path d="M100 55 L160 20" strokeWidth="4" />
    </svg>
  );
}
