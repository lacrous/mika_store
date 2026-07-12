import type { Product } from "@/types"

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

export const products: Product[] = [
  {
    id: "p1",
    name: "Akatsuki Cloud Oversized Hoodie",
    slug: "akatsuki-cloud-oversized-hoodie",
    price: 89,
    originalPrice: 110,
    category: "hoodies",
    anime: "Naruto",
    description:
      "Premium heavyweight cotton hoodie featuring the iconic red cloud pattern. Relaxed oversized fit with a soft brushed fleece interior, kangaroo pocket, and ribbed cuffs.",
    image: unsplash("1578587018452-892bacefd3f2"),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Crimson", value: "#8b1e1e" },
    ],
    rating: 4.9,
    reviewCount: 128,
    badges: ["bestseller", "sale"],
    inStock: true,
  },
  {
    id: "p2",
    name: "Survey Corps Scout Jacket",
    slug: "survey-corps-scout-jacket",
    price: 129,
    category: "outerwear",
    anime: "Attack on Titan",
    description:
      "Green canvas jacket inspired by the Survey Corps. Embroidered wings of freedom patch, reinforced shoulders, and a tailored cut that looks great on and off duty.",
    image: unsplash("1556905054-8f5e68f1e9c5"),
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", value: "#4a5d23" },
      { name: "Black", value: "#111111" },
    ],
    rating: 4.8,
    reviewCount: 96,
    badges: ["new", "limited"],
    inStock: true,
  },
  {
    id: "p3",
    name: "Demon Slayer Corps Tee",
    slug: "demon-slayer-corps-tee",
    price: 39,
    category: "t-shirts",
    anime: "Demon Slayer",
    description:
      "Soft ring-spun cotton tee with a subtle Demon Slayer Corps crest. Minimal front print, larger back graphic, and a comfortable unisex fit.",
    image: unsplash("1583743814966-4306a43cdbba"),
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", value: "#f5f5f5" },
      { name: "Black", value: "#111111" },
      { name: "Green", value: "#1e3a2f" },
    ],
    rating: 4.7,
    reviewCount: 214,
    badges: ["bestseller"],
    inStock: true,
  },
  {
    id: "p4",
    name: "Gojo Infinity Domain Hoodie",
    slug: "gojo-infinity-domain-hoodie",
    price: 95,
    category: "hoodies",
    anime: "Jujutsu Kaisen",
    description:
      "Blindfold-inspired design with infinity symbol embroidery. Premium heavyweight fleece, drop-shoulder silhouette, and hidden interior pocket.",
    image: unsplash("1556906781-9a412961c28c"),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Purple", value: "#4a306d" },
    ],
    rating: 4.9,
    reviewCount: 156,
    badges: ["new"],
    inStock: true,
  },
  {
    id: "p5",
    name: "Straw Hat Pirates Flag Tee",
    slug: "straw-hat-pirates-flag-tee",
    price: 34,
    originalPrice: 42,
    category: "t-shirts",
    anime: "One Piece",
    description:
      "Classic pirate flag graphic on a vintage-wash cotton tee. Pre-shrunk fabric with a relaxed fit, perfect for everyday adventures.",
    image: unsplash("1576566588028-4147f2359192"),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Navy", value: "#1a2744" },
    ],
    rating: 4.8,
    reviewCount: 189,
    badges: ["sale"],
    inStock: true,
  },
  {
    id: "p6",
    name: "Eren Yeager Titan Bomber",
    slug: "eren-yeager-titan-bomber",
    price: 119,
    category: "outerwear",
    anime: "Attack on Titan",
    description:
      "Satin bomber jacket with Titan-themed sleeve print and custom metal zipper pulls. Quilted lining for warmth and a premium finish.",
    image: unsplash("1591047139829-d91aecb6caea"),
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Brown", value: "#5c4033" },
    ],
    rating: 4.6,
    reviewCount: 74,
    badges: ["limited"],
    inStock: true,
  },
  {
    id: "p7",
    name: "Konoha Leaf Varsity Jacket",
    slug: "konoha-leaf-varsity-jacket",
    price: 139,
    category: "outerwear",
    anime: "Naruto",
    description:
      "Wool-blend varsity jacket with chenille Leaf Village patch, striped ribbing, and snap-button closure. A collector's piece for any shinobi.",
    image: unsplash("1551028919-323c6959b8a7"),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Green", value: "#2d4a3e" },
      { name: "Black", value: "#111111" },
    ],
    rating: 4.9,
    reviewCount: 112,
    badges: ["bestseller"],
    inStock: true,
  },
  {
    id: "p8",
    name: "Zangetsu Minimalist Tee",
    slug: "zangetsu-minimalist-tee",
    price: 36,
    category: "t-shirts",
    anime: "Bleach",
    description:
      "Clean monochrome tee with a subtle Zangetsu blade graphic. Breathable cotton jersey with a tailored fit and reinforced collar.",
    image: unsplash("1618354691373-30a4fcf33de9"),
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#f5f5f5" },
      { name: "Black", value: "#111111" },
    ],
    rating: 4.7,
    reviewCount: 88,
    badges: ["new"],
    inStock: true,
  },
  {
    id: "p9",
    name: "Chibi Straw Hat Crew Cap",
    slug: "chibi-straw-hat-crew-cap",
    price: 28,
    category: "accessories",
    anime: "One Piece",
    description:
      "Adjustable dad cap with embroidered chibi crew icons. Curved brim, breathable eyelets, and antique brass buckle.",
    image: unsplash("1588850561407-ed78c282e89b"),
    sizes: ["One Size"],
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Red", value: "#8b1e1e" },
    ],
    rating: 4.5,
    reviewCount: 64,
    badges: ["bestseller"],
    inStock: true,
  },
  {
    id: "p10",
    name: "Ninja Headband Set",
    slug: "ninja-headband-set",
    price: 22,
    category: "accessories",
    anime: "Naruto",
    description:
      "Set of 3 metal-plated ninja headbands with fabric ties. Collector's pack includes Leaf, Sand, and Mist village variants.",
    image: unsplash("1620799140408-edc6dcb6d633"),
    sizes: ["One Size"],
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Blue", value: "#1e3a5f" },
    ],
    rating: 4.6,
    reviewCount: 201,
    badges: ["sale"],
    inStock: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products
    .filter((p) => p.badges.includes("bestseller") || p.badges.includes("new"))
    .slice(0, limit)
}

export function getNewArrivals(limit = 4): Product[] {
  return products.filter((p) => p.badges.includes("new")).slice(0, limit)
}
