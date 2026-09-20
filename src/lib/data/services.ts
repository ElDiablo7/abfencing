import { ShieldCheck, Hammer, Wrench } from "lucide-react";

export const services = [
  {
    id: "fencing",
    slug: "fencing",
    title: "New Fencing",
    description: "High-quality closeboard, panel, and picket fencing installed to last against the British weather.",
    icon: ShieldCheck,
    image: "/images/gallery-fencing.jpg",
    features: [
      "Closeboard & Featheredge Fencing",
      "Traditional Panel Fencing",
      "Picket Fencing",
      "Concrete or Timber Posts",
      "Gravel Boards Included",
    ],
    priceGuide: "From £55 per metre",
  },
  {
    id: "repairs",
    slug: "repairs",
    title: "Repairs & Maintenance",
    description: "Storm damage? Rotten posts? We provide rapid repair services to secure your property.",
    icon: Wrench,
    image: "/images/gallery-repairs.jpg",
    features: [
      "Storm Damage Repair",
      "Post Replacement (Spur Posts)",
      "Panel Replacement",
      "Fence Painting & Treatment",
      "Emergency Make-Safe Service",
    ],
    priceGuide: "Quoted per job",
  },
  {
    id: "gates",
    slug: "gates",
    title: "Gates",
    description: "Custom built timber gates to match your fencing, providing security and easy access.",
    icon: Hammer,
    image: "/images/gallery-gate.jpg",
    features: [
      "Side Entrance Gates",
      "Driveway Gates",
      "Custom Sizing",
      "Heavy Duty Hinges & Locks",
      "Matching Fence Styles",
    ],
    priceGuide: "From £150 per gate",
  },
];
