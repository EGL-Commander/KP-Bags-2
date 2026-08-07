const productImages = {
  "type-a-b-c": "/fibc-type-a.jpeg",
  "baffle-bag-q-bag": "/baffle-bag.jpeg",
  "ventilated-fibc": "/Ventilated Agricultural Bags.png",
  "container-liner": "/Container Stuffing Dock.png",
  "anti-trip-mesh": "/Anti-Sifting.png",
  "circular-fabric": "/high-speed-circular-loom.jpg",
  "pp-woven-fabric": "/high-speed-circular-loom.jpg",
  "sulzer-flat-fabric": "/high-speed-circular-loom.jpg",
  "ventilated-fabric": "/Ventilated Agricultural Bags.png",
  "stretch-film": "/Accelerated.png"
};

export const categories = [
  {
    id: "fibc",
    name: "FIBC Categories",
    description: "Flexible Intermediate Bulk Containers (FIBC), also known as big bags or jumbo bags, designed for industrial storage and transport.",
    subcategories: [
      { slug: "type-a-b-c", name: "Type-A / B / C Bags", description: "Electrostatic safe jumbo bags including standard non-conductive, breakdown voltage protected, and groundable conductive bags." },
      { slug: "u-panel-bags", name: "U-Panel Bags", description: "Classic industrial jumbo bags made with a U-shaped fabric panel forming the bottom and two sides, providing high weight capacity." },
      { slug: "four-panel-bags", name: "4-Panel Bags", description: "Constructed with four separate side panels sewn to a square base, offering excellent shape retention during transport." },
      { slug: "four-loop-circular-tubular", name: "Four Loop Circular/Tubular Bag", description: "Woven as a continuous cylinder with no vertical seams, reducing risk of leakage and sifting." },
      { slug: "conical-bag", name: "Conical Bag", description: "Specially shaped bottom that narrows towards the discharge outlet, ideal for sticky or poor-flowing materials." },
      { slug: "tunnel-bags", name: "Tunnel Bags", description: "Features side tunnel loops that allow easy lift truck fork access without needing manual loop lifting." },
      { slug: "baffle-bag-q-bag", name: "Baffle Bag / Q Bag", description: "Internal baffles maintain a square shape post-filling, saving up to 30% storage space and improving container load stability." },
      { slug: "builder-bag", name: "Builder Bag", description: "Heavy-duty, budget-friendly open-top bags designed for bulk sand, aggregate, gravel, and construction waste." },
      { slug: "ventilated-fibc", name: "Ventilated FIBC Bags", description: "Woven with breathable air strips to prevent moisture accumulation and rot, perfect for agricultural produce like potatoes and onions." },
      { slug: "container-liner", name: "Container Liner Bags", description: "Protective fabric linings designed to convert standard shipping containers into bulk dry cargo transport systems." },
      { slug: "one-two-loop-bag", name: "One/Two Loop Bag", description: "Cost-effective, single or double lifting loop design commonly used in fertilizer, seed, and agricultural sectors." },
      { slug: "leno-mesh-bag", name: "Leno Mesh Bag", description: "High-permeability mesh bags designed for packaging fresh produce, offering visibility and max ventilation." }
    ]
  },
  {
    id: "bopp-woven",
    name: "Woven Sack Bags",
    description: "High-graphics B2B packaging bags made by laminating reverse-printed BOPP film onto woven PP fabric.",
    subcategories: [
      { slug: "bopp-gusseted", name: "BOPP Laminated Bags with Gussets", description: "Gusseted side-folds that expand for a rectangular block shape when filled, ideal for vertical shelf displays." },
      { slug: "bopp-single-side", name: "Single Side BOPP Laminated PP Woven Bags", description: "BOPP gloss/matte graphic printing on the front side with plain woven texture on the back side." },
      { slug: "bopp-both-sides", name: "Both Side BOPP Laminated PP Woven Bags", description: "Dual-sided high-resolution graphic branding, protecting packaging from moisture and dust." },
      { slug: "bopp-specialty-seam", name: "Specialty Bags (Handles, Perforations, D-Cut, Valve, EZ Peel)", description: "Advanced packaging features including easy-open seam threads, D-cut handles, micro-perforations, and internal valves." }
    ]
  },
  {
    id: "agro-textile",
    name: "Agro Textiles",
    description: "Specialized synthetic fabrics for agricultural growth protection, weed management, and microclimate control.",
    subcategories: [
      { slug: "ground-cover-weed-mat", name: "Ground Cover / Weed Mat", description: "UV-stabilized PP ground covers that block sunlight to suppress weeds while allowing air and water to penetrate." },
      { slug: "anti-hail-net", name: "Anti-Hail Net", description: "High-density monofilament netting protecting fruit trees and crops from physical hail damage and high winds." },
      { slug: "anti-trip-mesh", name: "Anti-Trip Mesh", description: "Heavy-duty ground grids and stabilizer meshes preventing soil erosion and slip zones in farming paths." },
      { slug: "woven-shade-net", name: "Woven Shade Net", description: "Knitted shade fabrics providing controlled microclimates (30% to 90% shade factor) for greenhouses and nurseries." },
      { slug: "monofilament-fabric", name: "Monofilament Fabric", description: "Ultra-durable single-strand woven fabrics offering maximum tensile strength and mechanical resistance." }
    ]
  },
  {
    id: "geo-textile",
    name: "Geo-textiles",
    description: "Permeable fabrics used in civil engineering, roadworks, and construction projects for drainage, separation, and reinforcement.",
    subcategories: [
      { slug: "silt-fence-geotextile", name: "Woven Geotextile for PP Silt Fence", description: "Specially formulated erosion-control fabric that traps silt and sediment runoff on construction sites." },
      { slug: "multifilament-geotextile", name: "Woven Geotextile from PP Multifilament Yarn", description: "High-performance civil engineering fabric providing excellent filtration, reinforcement, and separation." },
      { slug: "geo-textile-fabric", name: "Geo Textile Fabric", description: "Heavy-duty structural fabrics designed to stabilize subgrades, retaining walls, and shoreline embankments." }
    ]
  },
  {
    id: "multifilament-yarn",
    name: "Multifilament Yarn",
    description: "High-tenacity polypropylene multifilament yarns engineered for stitching, webbings, sewing, and industrial applications.",
    subcategories: [
      { slug: "twisted-yarn", name: "Twisted Yarn", description: "Ply-twisted PP yarns that provide elevated tensile strength and friction resistance for heavy-duty stitching." },
    ]
  },
  {
    id: "fabric",
    name: "Fabric Rolls",
    description: "Woven polypropylene fabrics in flat (Sulzer) or circular tubular rolls, tailored for converting and packaging.",
    subcategories: [
      { slug: "circular-fabric", name: "Circular Fabric", description: "Tubular PP fabric rolls woven on circular looms, ideal for direct sack manufacturing with no side-seams." },
      { slug: "pp-woven-fabric", name: "PP Woven Fabric", description: "Premium strength, flat woven rolls available in various GSM, widths, and colors with UV stabilization." },
      { slug: "sulzer-flat-fabric", name: "Sulzer / Flat Fabric", description: "Heavy-duty flat-woven fabrics produced on Sulzer projectile looms, offering premium tensile uniformity." },
      { slug: "ventilated-fabric", name: "Ventilated Fabric", description: "Woven with breathing slits for agricultural packing conversions, letting contents respire." },
    ]
  },
  {
    id: "tarpaulin",
    name: "Tarpaulins",
    description: "Heavy-duty waterproof protective sheets used for shelter, crop covering, logistics transport, and containment.",
    subcategories: [
      { slug: "pvc-coated-tarpaulin", name: "PVC Coated Tarpaulin", description: "Ultra-heavy-duty waterproof sheets coated with PVC on both sides, flame retardant and resistant to oil and rot." },
      { slug: "hdpe-coated-tarpaulin", name: "HDPE Coated Tarpaulin", description: "High-density woven core coated with low-density film, lightweight yet tough for general transport cargo protection." },
      { slug: "ldpe-coated-tarpaulin", name: "LDPE Coated Tarpaulin", description: "Extremely flexible, waterproof sheets with double-sided LDPE laminate, perfect for farm silage and rain shelter." },
      { slug: "cross-laminated-tarpaulin", name: "Cross Laminated Tarpaulin", description: "State-of-the-art cross-directionally laminated film, virtually tear-proof, extremely light, and 100% recyclable." }
    ]
  },
  // {
  //   id: "other-products",
  //   name: "Other Packaging Products",
  //   description: "Essential industrial accessories for securing, binding, strapping, and shipping bulk goods.",
  //   subcategories: [
  //     { slug: "stretch-film", name: "Stretch Film", description: "High-stretch LLDPE pallet wrap films protecting packed goods from moisture, dust, and shifting during transit." },
  //   ]
  // }
];

// Flat list of products for lookup
export const products = categories.reduce((acc, cat) => {
  cat.subcategories.forEach(sub => {
    acc.push({
      ...sub,
      categoryId: cat.id,
      categoryName: cat.name,

      specifications: getSpecsForProduct(sub.slug),
      applications: getAppsForProduct(sub.slug),

      // Product Image
      image: productImages[sub.slug] || "/logo.jpg"
    });
  });
  return acc;
}, []);

function getSpecsForProduct(slug) {
  if (slug.includes("fibc") || slug.includes("bag") || slug.includes("panel") || slug.includes("loop") || slug.includes("baffle")) {
    return {
      "Material": "100% Virgin Polypropylene (PP), UV Stabilized",
      "Safe Working Load (SWL)": "500 Kg to 2000 Kg",
      "Safety Factor (SF)": "5:1 (Single trip) or 6:1 (Multi-trip)",
      "Fabric Weight (GSM)": "120 GSM to 240 GSM",
      "Lamination": "Uncoated or Coated (Internal/External)",
      "Liner": "Form-fit, tubular, suspended, or conductive liners available",
      "Printing": "Up to 4 colors with customized B2B branding",
      "Certifications": "ISO 9001:2015, UN Certified for Hazardous materials, Food Grade cleanroom"
    };
  } else if (slug.includes("bopp")) {
    return {
      "Material": "BOPP (Biaxially Oriented Polypropylene) + Woven PP Fabric",
      "Printing Options": "Multi-color Rotogravure print up to 8 colors (gloss or matte finish)",
      "Lamination": "Single or Double-sided extrusion coating",
      "GSM Range": "60 GSM to 120 GSM",
      "Special Options": "EZ-Open, micro-perforations, valve, D-Cut handle, top hemmed, bottom gusseted",
      "Packing Capacity": "5 Kg to 50 Kg bags"
    };
  } else if (slug.includes("geotextile") || slug.includes("geo")) {
    return {
      "Material": "Polypropylene (PP) High Tenacity yarns",
      "Tensile Strength": "20 kN/m to 400 kN/m",
      "Permeability / Flow Rate": "10 L/m²/s to 80 L/m²/s",
      "UV Resistance": "> 70% retention after 500 hours exposure",
      "Standard Width": "0.5m to 5.25m",
      "Roll Length": "100m to 200m or custom"
    };
  } else if (slug.includes("yarn")) {
    return {
      "Type": "High Tenacity Polypropylene Multifilament Yarn",
      "Denier Range": "600 Denier to 4000 Denier",
      "Tenacity": "4.0 gpd to 7.2 gpd (grams per denier)",
      "Intermingle Points": "15 to 30 knots per meter",
      "Twist range": "60 TPM to 120 TPM",
      "UV Stabilization": "150 kly to 400 kly options available"
    };
  } else if (slug.includes("fabric")) {
    return {
      "Material": "100% Polypropylene (PP) Woven Matrix",
      "Weave Density": "8x8 to 15x15 tapes per inch",
      "Width Range": "30 cm to 220 cm  / 60 cm to 440 cm (flat)",
      "GSM Range": "50 GSM to 250 GSM",
      "UV Stability": "Optional up to 300 kly",
      "Lamination": "Available (15 to 40 GSM coating weight)"
    };
  } else if (slug.includes("tarpaulin")) {
    return {
      "Material": "HDPE Woven Core, Double-sided LDPE Laminated (or PVC Coated)",
      "Thickness / GSM": "90 GSM to 450 GSM",
      "Waterproofing": "100% Leakproof",
      "Grommets": "Rustproof aluminum eyelets at 1m intervals",
      "Edges": "Reinforced with PP rope in heat-sealed hems",
      "UV Protection": "Double-sided UV stabilization coating"
    };
  } else {
    return {
      "Material": "Premium Grade Industrial Polypropylene/Polyester",
      "Sizing": "Standard and custom commercial specifications",
      "Stiffness / Durability": "Engineered for high stress industrial environments",
      "UV Resistance": "High UV stabilized properties"
    };
  }
}

function getAppsForProduct(slug) {
  if (slug.includes("fibc") || slug.includes("bag") || slug.includes("panel") || slug.includes("loop") || slug.includes("baffle")) {
    return [
      "Bulk chemical powders and granular substances",
      "Agricultural grains, seeds, fertilizer, and animal feed",
      "Construction sand, gravel, cement, and concrete premix",
      "Mining minerals, ores, coal, and crushed aggregates",
      "Food grade starch, milk powder, sugar, and flour packaging"
    ];
  } else if (slug.includes("bopp")) {
    return [
      "Premium pet food packaging (dog/cat food)",
      "Retail rice, pulses, and grain branding",
      "Farming fertilizers and chemical powders",
      "Commercial flour, sugar, and shopping sack brands",
      "High-graphics retail merchandise bags"
    ];
  } else if (slug.includes("geotextile") || slug.includes("geo")) {
    return [
      "Soil separation and stability under highways and railways",
      "Silt fencing and run-off containment on construction sites",
      "Shoreline erosion protection and riverbank revetments",
      "Subsurface drainage and filtration layers",
      "Pond liner protection and waste landfill containment"
    ];
  } else if (slug.includes("yarn")) {
    return [
      "High-speed sewing thread for FIBC bags stitching",
      "Narrow woven fabrics, lifting belts, and industrial webbing",
      "Industrial ropes, cordages, nets, and sling manufacture",
      "Filter fabrics and heavy-duty sewing stitching"
    ];
  } else if (slug.includes("fabric")) {
    return [
      "Manufacturing PP woven sacks and bags",
      "Cargo lumber wrap and industrial steel covers",
      "Ground weed barriers and greenhouse floor spreads",
      "Interim agricultural storage covers and bag linings"
    ];
  } else if (slug.includes("tarpaulin")) {
    return [
      "All-weather cargo covers for shipping trucks and flatbeds",
      "Farm silo sheets, grain liners, and haystack shelters",
      "Temporary emergency weather relief housing and tents",
      "Industrial machinery floor containment and dust liners"
    ];
  } else {
    return [
      "Palletized load stabilization and protection during transit",
      "Heavy load strapping, box reinforcement, and tie-downs",
      "Horticulture nursery roots respiration and nursery grow beds",
      "Industrial packaging accessories"
    ];
  }
}