export const products = [
  {
    id: "prd-linen-overshirt",
    slug: "linen-atelier-overshirt",
    name: "Linen Atelier Overshirt",
    category: "Outerwear",
    collection: "Terra '26",
    description: "A softly structured layer cut from breathable linen twill, finished with corozo buttons and generous patch pockets.",
    details: ["European linen blend", "Relaxed unisex fit", "Corozo nut buttons", "Cold wash, line dry"],
    basePrice: 148,
    originalPrice: 178,
    rating: 4.9,
    reviewCount: 128,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Neutral linen overshirt styled in an editorial setting",
    colors: [
      { name: "Oat", hex: "#d8c9af" },
      { name: "Olive", hex: "#66705a" },
      { name: "Ink", hex: "#252a2d" }
    ],
    variants: [
      { id: "var-lo-xs-oat", size: "XS", color: "Oat", sku: "EA-LO-XS-OAT", stock: 5 },
      { id: "var-lo-s-oat", size: "S", color: "Oat", sku: "EA-LO-S-OAT", stock: 12 },
      { id: "var-lo-m-oat", size: "M", color: "Oat", sku: "EA-LO-M-OAT", stock: 18 },
      { id: "var-lo-l-oat", size: "L", color: "Oat", sku: "EA-LO-L-OAT", stock: 9 },
      { id: "var-lo-xl-oat", size: "XL", color: "Oat", sku: "EA-LO-XL-OAT", stock: 3 }
    ]
  },
  {
    id: "prd-sculpt-trouser",
    slug: "sculpted-wide-trouser",
    name: "Sculpted Wide Trouser",
    category: "Bottoms",
    collection: "Terra '26",
    description: "Fluid tailoring with a high rise, double pleat and quietly dramatic leg. Designed to move from studio hours to late dinners.",
    details: ["TENCEL™ wool blend", "High-rise tailored waist", "Full-length wide leg", "Dry clean recommended"],
    basePrice: 126,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 94,
    badge: "New",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Wide tailored trousers in a warm neutral palette",
    colors: [
      { name: "Espresso", hex: "#4a3028" },
      { name: "Stone", hex: "#b8ad9c" }
    ],
    variants: [
      { id: "var-st-26-esp", size: "26", color: "Espresso", sku: "EA-ST-26-ESP", stock: 7 },
      { id: "var-st-28-esp", size: "28", color: "Espresso", sku: "EA-ST-28-ESP", stock: 11 },
      { id: "var-st-30-esp", size: "30", color: "Espresso", sku: "EA-ST-30-ESP", stock: 14 },
      { id: "var-st-32-esp", size: "32", color: "Espresso", sku: "EA-ST-32-ESP", stock: 6 }
    ]
  },
  {
    id: "prd-ribbed-knit",
    slug: "contour-rib-knit",
    name: "Contour Rib Knit",
    category: "Knitwear",
    collection: "Core Forms",
    description: "A close, comfortable knit with architectural ribbing and a clean squared neckline. Made for thoughtful layering.",
    details: ["Organic cotton rib", "Soft stretch structure", "Bra-friendly neckline", "Machine washable"],
    basePrice: 84,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 76,
    badge: null,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Minimal rib knit top in soft studio light",
    colors: [
      { name: "Chalk", hex: "#eee9df" },
      { name: "Terracotta", hex: "#a9573e" },
      { name: "Black", hex: "#1d1d1b" }
    ],
    variants: [
      { id: "var-rk-xs-chalk", size: "XS", color: "Chalk", sku: "EA-RK-XS-CHK", stock: 16 },
      { id: "var-rk-s-chalk", size: "S", color: "Chalk", sku: "EA-RK-S-CHK", stock: 22 },
      { id: "var-rk-m-chalk", size: "M", color: "Chalk", sku: "EA-RK-M-CHK", stock: 12 },
      { id: "var-rk-l-chalk", size: "L", color: "Chalk", sku: "EA-RK-L-CHK", stock: 8 }
    ]
  },
  {
    id: "prd-drape-dress",
    slug: "asymmetric-drape-dress",
    name: "Asymmetric Drape Dress",
    category: "Dresses",
    collection: "After Light",
    description: "A sculptural evening silhouette in washed satin, balancing a clean shoulder with an effortless asymmetric drape.",
    details: ["FSC-certified acetate satin", "Bias-cut silhouette", "Concealed side zip", "Dry clean only"],
    basePrice: 198,
    originalPrice: 238,
    rating: 4.9,
    reviewCount: 61,
    badge: "Limited",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Flowing asymmetric dress photographed outdoors",
    colors: [
      { name: "Sienna", hex: "#9f4c37" },
      { name: "Midnight", hex: "#252632" }
    ],
    variants: [
      { id: "var-dd-xs-sie", size: "XS", color: "Sienna", sku: "EA-DD-XS-SIE", stock: 4 },
      { id: "var-dd-s-sie", size: "S", color: "Sienna", sku: "EA-DD-S-SIE", stock: 6 },
      { id: "var-dd-m-sie", size: "M", color: "Sienna", sku: "EA-DD-M-SIE", stock: 7 },
      { id: "var-dd-l-sie", size: "L", color: "Sienna", sku: "EA-DD-L-SIE", stock: 2 }
    ]
  },
  {
    id: "prd-work-jacket",
    slug: "canvas-work-jacket",
    name: "Canvas Work Jacket",
    category: "Outerwear",
    collection: "Core Forms",
    description: "A modern chore jacket with thoughtful utility, softened through a garment wash for lived-in character from day one.",
    details: ["Organic cotton canvas", "Garment washed", "Three utility pockets", "Machine washable"],
    basePrice: 164,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 109,
    badge: null,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Structured canvas jacket styled with neutral clothing",
    colors: [
      { name: "Clay", hex: "#a0694f" },
      { name: "Moss", hex: "#63634d" }
    ],
    variants: [
      { id: "var-wj-s-clay", size: "S", color: "Clay", sku: "EA-WJ-S-CLY", stock: 8 },
      { id: "var-wj-m-clay", size: "M", color: "Clay", sku: "EA-WJ-M-CLY", stock: 15 },
      { id: "var-wj-l-clay", size: "L", color: "Clay", sku: "EA-WJ-L-CLY", stock: 11 },
      { id: "var-wj-xl-clay", size: "XL", color: "Clay", sku: "EA-WJ-XL-CLY", stock: 5 }
    ]
  },
  {
    id: "prd-column-skirt",
    slug: "washed-column-skirt",
    name: "Washed Column Skirt",
    category: "Bottoms",
    collection: "After Light",
    description: "An elongated column skirt with a subtle washed finish and back vent, bringing ease to a precise silhouette.",
    details: ["Lyocell twill", "Midi column shape", "Back walking vent", "Machine washable"],
    basePrice: 112,
    originalPrice: 132,
    rating: 4.6,
    reviewCount: 47,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Editorial styling with a long column skirt",
    colors: [
      { name: "Charcoal", hex: "#414143" },
      { name: "Sand", hex: "#c9b69c" }
    ],
    variants: [
      { id: "var-cs-26-cha", size: "26", color: "Charcoal", sku: "EA-CS-26-CHR", stock: 4 },
      { id: "var-cs-28-cha", size: "28", color: "Charcoal", sku: "EA-CS-28-CHR", stock: 9 },
      { id: "var-cs-30-cha", size: "30", color: "Charcoal", sku: "EA-CS-30-CHR", stock: 8 },
      { id: "var-cs-32-cha", size: "32", color: "Charcoal", sku: "EA-CS-32-CHR", stock: 3 }
    ]
  }
];

export const categories = ["All", "Outerwear", "Knitwear", "Bottoms", "Dresses"];
