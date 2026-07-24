import { db } from "./src/db";
import { products } from "./src/db/schema";

const seedProducts = [
  {
    name: "Maison Linen Sofa",
    slug: "maison-linen-sofa",
    category: "living-room",
    price: 489000,
    description:
      "A three-seat sofa upholstered in Belgian washed linen, with a solid beechwood frame and down-blend cushions that invite you to stay awhile.",
    details:
      "Hand-built in Antwerp using centuries-old joinery techniques. Frame is kiln-dried European beech, cushions are a 70/30 down-feather blend over high-resilience foam. Removable, dry-clean-only covers.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80&auto=format&fit=crop",
    ],
    materials: ["Belgian linen", "Beechwood frame", "Down-feather fill"],
    featured: true,
    stock: 8,
  },
  {
    name: "Kyoto Oak Dining Table",
    slug: "kyoto-oak-dining-table",
    category: "dining",
    price: 329000,
    description:
      "A solid white oak dining table with hand-rubbed oil finish, shaped in a family-run Kyoto workshop. Seats six comfortably.",
    details:
      "Handcrafted from FSC-certified Japanese white oak. Traditional mortise-and-tenon joinery — no metal fasteners. Finished with cold-pressed linseed oil that deepens with age.",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80&auto=format&fit=crop",
    ],
    materials: ["FSC-certified Japanese white oak", "Linseed oil finish"],
    featured: true,
    stock: 5,
  },
  {
    name: "Arc Brass Floor Lamp",
    slug: "arc-brass-floor-lamp",
    category: "lighting",
    price: 129000,
    description:
      "A gently curving floor lamp in hand-aged brass with a linen drum shade. Casts a warm, even glow across the room.",
    details:
      "Solid brass stem hand-patinated over 40 hours. Linen shade woven in Belgium. Dimmer switch at base. E26 socket, compatible with LED bulbs.",
    image:
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80&auto=format&fit=crop",
    ],
    materials: ["Solid brass", "Belgian linen shade"],
    featured: true,
    stock: 12,
  },
  {
    name: "Copenhaven Bed Frame",
    slug: "copenhaven-bed-frame",
    category: "bedroom",
    price: 279000,
    description:
      "A minimal platform bed in solid walnut, with soft rounded edges and a low profile inspired by mid-century Danish design.",
    details:
      "Solid American black walnut. Oil finish that resists stains. Includes solid slat base — no box spring required. Fits standard mattress sizes.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&auto=format&fit=crop",
    ],
    materials: ["American black walnut", "Oil finish"],
    featured: true,
    stock: 6,
  },
  {
    name: "Atelier Bouclé Armchair",
    slug: "atelier-boucle-armchair",
    category: "living-room",
    price: 219000,
    description:
      "A generously scaled armchair in ivory bouclé, with curved oak arms and a gently reclined back.",
    details:
      "Handmade in Portugal. Kiln-dried oak frame. Bouclé upholstery in 100% New Zealand wool. High-density foam core with down-feather wrap.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop",
    ],
    materials: ["New Zealand wool bouclé", "Oak frame", "Down-feather fill"],
    featured: false,
    stock: 9,
  },
  {
    name: "Nordic Nightstand",
    slug: "nordic-nightstand",
    category: "bedroom",
    price: 89000,
    description:
      "A simple nightstand in solid ash with a single soft-close drawer. Pairs perfectly with the Copenhaven bed.",
    details:
      "Solid European ash, oil-finished. Soft-close drawer with hand-fitted dovetail joinery. No hardware visible from the front.",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80&auto=format&fit=crop",
    gallery: [],
    materials: ["European ash", "Oil finish"],
    featured: false,
    stock: 14,
  },
  {
    name: "Pendant Globe Sconce",
    slug: "pendant-globe-sconce",
    category: "lighting",
    price: 79000,
    description:
      "A mouth-blown opal glass globe with a blackened steel mounting plate. Sold individually.",
    details:
      "Opal glass hand-blown in Czech Republic. Blackened steel plate with satin finish. E14 socket, LED-compatible. Hardwire installation only.",
    image:
      "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=1200&q=80&auto=format&fit=crop",
    gallery: [],
    materials: ["Mouth-blown opal glass", "Blackened steel"],
    featured: false,
    stock: 20,
  },
  {
    name: "Hand-Thrown Stoneware Vase",
    slug: "hand-thrown-stoneware-vase",
    category: "accessories",
    price: 18900,
    description:
      "A tall stoneware vase with a raw, unglazed body and subtle variation in each piece.",
    details:
      "Hand-thrown by ceramicist Lena Okafor in her Lisbon studio. High-fired stoneware, food-safe interior. Each piece is unique.",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&q=80&auto=format&fit=crop",
    gallery: [],
    materials: ["High-fired stoneware"],
    featured: false,
    stock: 25,
  },
  {
    name: "Wool Area Rug · Ivory",
    slug: "wool-area-rug-ivory",
    category: "accessories",
    price: 189000,
    description:
      "A hand-knotted wool rug in a soft ivory, with subtle tonal variation. 8'x10'.",
    details:
      "Hand-knotted in India from New Zealand wool. 100 knots per square inch. Pile height 1/2\". Professional cleaning recommended.",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=80&auto=format&fit=crop",
    gallery: [],
    materials: ["100% New Zealand wool"],
    featured: true,
    stock: 7,
  },
  {
    name: "Marble Side Table",
    slug: "marble-side-table",
    category: "living-room",
    price: 149000,
    description:
      "A sculptural side table in honed Carrara marble with a blackened steel base.",
    details:
      "Solid Carrara marble top, honed finish. Blackened steel base with adjustable feet. Sealed for stain resistance.",
    image:
      "https://images.unsplash.com/photo-1581952976147-5a2d155603c8?w=1200&q=80&auto=format&fit=crop",
    gallery: [],
    materials: ["Carrara marble", "Blackened steel"],
    featured: false,
    stock: 10,
  },
  {
    name: "Linen Duvet Cover Set",
    slug: "linen-duvet-cover-set",
    category: "bedroom",
    price: 34900,
    description:
      "A pre-washed linen duvet cover and two shams in a soft natural ivory. Gets softer with every wash.",
    details:
      "100% European flax linen, stonewashed for softness. Hidden button closure. OEKO-TEX certified.",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80&auto=format&fit=crop",
    gallery: [],
    materials: ["European flax linen"],
    featured: false,
    stock: 30,
  },
  {
    name: "Brass Candle Holder · Set of 3",
    slug: "brass-candle-holder-set",
    category: "accessories",
    price: 24900,
    description:
      "A trio of solid brass candle holders in graduated heights. Develops a rich patina over time.",
    details:
      "Solid brass, unlacquered. Heights: 4\", 6\", 8\". Fits standard taper candles.",
    image:
      "https://images.unsplash.com/photo-1602872029708-84d59ef4e375?w=1200&q=80&auto=format&fit=crop",
    gallery: [],
    materials: ["Solid brass"],
    featured: false,
    stock: 40,
  },
];

async function seed() {
  console.log("Seeding products...");
  await db.insert(products).values(seedProducts as any);
  console.log(`✓ Inserted ${seedProducts.length} products`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
