import { services } from "@/lib/data/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} | AB Fencing`,
    description: service.description,
  };
}

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-charcoal">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container-max mx-auto">
            <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white flex items-center gap-4">
              <service.icon className="w-10 h-10 md:w-12 md:h-12 text-accent hidden sm:block" />
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-max px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-heading font-bold mb-6 text-charcoal">About this Service</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {service.description}
            </p>
            
            <h3 className="text-2xl font-heading font-bold mb-6 text-charcoal mt-12">What&apos;s Included</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            {/* We will later embed the Before/After or Gallery grid here */}
          </div>

          {/* Sidebar / CTA */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 sticky top-28">
              <h3 className="text-xl font-heading font-bold text-charcoal mb-2">Interested in {service.title}?</h3>
              <p className="text-gray-500 mb-6 pb-6 border-b border-gray-100">
                Guide Price: <span className="font-semibold text-gray-800">{service.priceGuide}</span>
              </p>
              
              <div className="flex flex-col gap-4">
                <Link href="/quote" className="btn-primary w-full py-4 text-lg">
                  Get a Quote
                </Link>
                <a href="tel:+447000000000" className="btn-outline w-full py-4 text-lg">
                  Call Scott Now
                </a>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Fully insured & guaranteed work
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
