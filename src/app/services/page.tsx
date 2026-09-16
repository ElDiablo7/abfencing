import { services } from "@/lib/data/services";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | AB Fencing",
  description: "Explore our range of professional fencing, landscaping, decking, and repair services in Wallington.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="bg-primary-dark text-white py-16 mb-16">
        <div className="container-max px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Services</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Professional solutions for all your fencing and landscaping needs. Quality workmanship guaranteed.
          </p>
        </div>
      </div>

      <div className="container-max px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="card group flex flex-col h-full">
              <div className="h-56 relative overflow-hidden bg-gray-200">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-heading font-bold mb-3 text-charcoal group-hover:text-primary transition-colors">{service.title}</h2>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">{service.priceGuide}</span>
                  <Link href={`/services/${service.slug}`} className="text-primary font-semibold hover:text-primary-dark transition-colors">
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mini CTA */}
      <div className="container-max px-4 mt-24">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center border border-gray-200">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-charcoal">Not sure what you need?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            We offer free site surveys where Scott will visit your property, assess your requirements, and provide expert advice and a transparent quote.
          </p>
          <Link href="/contact" className="btn-primary">
            Book a Free Survey
          </Link>
        </div>
      </div>
    </div>
  );
}
