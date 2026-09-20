import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Gallery | AB Fencing",
  description: "Browse our gallery of recent fencing, decking, and landscaping projects completed in Wallington and South London.",
};

const images = [
  { src: "/images/gallery-fencing.jpg", alt: "New closeboard fencing" },
  { src: "/images/gallery-repairs.jpg", alt: "Fence repairs" },
  { src: "/images/gallery-gate.jpg", alt: "Custom timber gate" },
  { src: "/images/gallery-picket.jpg", alt: "Picket fencing" },
];

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="bg-primary-dark text-white py-16 mb-16">
        <div className="container-max px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Project Gallery</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Take a look at some of our recent fencing and landscaping transformations.
          </p>
        </div>
      </div>

      <div className="container-max px-4">
        {/* Note: This is a static grid for now. Can be upgraded to a lightbox gallery later */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="group relative h-72 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-medium p-6">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-gray-50 p-12 rounded-2xl border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal mb-4">Like what you see?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Contact us today to discuss your project. We can recreate any of these styles in your own garden.
          </p>
          <Link href="/quote" className="btn-primary py-4 px-8 text-lg">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
