import { Shield, Hammer, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {/* We'll use a placeholder image for now, later to be replaced by actual client photos */}
        <Image 
          src="https://images.unsplash.com/photo-1588622153215-613d9691dfcc?q=80&w=2070&auto=format&fit=crop"
          alt="Professional Fencing Installation"
          fill
          className="object-cover object-center"
          priority
        />
        
        <div className="container-max px-4 relative z-20 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent-light font-semibold text-sm mb-6 border border-accent/30 backdrop-blur-sm animate-fade-in">
            Wallington&apos;s Trusted Fencing Experts
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white leading-tight mb-6 animate-fade-up">
            Professional Fencing &<br className="hidden md:block" /> Landscaping Services
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Family-run business with over 20 years of experience. We deliver high-quality, durable fences that transform your garden.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <Link href="/quote" className="btn-accent w-full sm:w-auto text-lg py-4 px-8">
              Get Your Free Quote
            </Link>
            <a href="tel:+447000000000" className="btn-outline border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto text-lg py-4 px-8">
              Call Scott Now
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="container-max px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Clock, text: "20+ Years Experience" },
              { icon: Shield, text: "Fully Insured" },
              { icon: Hammer, text: "Family Run Business" },
              { icon: CheckCircle, text: "Free Site Surveys" },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                <badge.icon className="w-6 h-6 text-primary" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-padding bg-gray-50">
        <div className="container-max text-center">
          <h2 className="section-title mb-4">Our Services</h2>
          <p className="section-subtitle mx-auto mb-16">
            From emergency repairs to complete garden transformations, we handle it all with professional care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {/* Service 1 */}
            <div className="card group">
              <div className="h-48 relative overflow-hidden bg-gray-200">
                <Image src="https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?q=80&w=2070&auto=format&fit=crop" alt="Fencing" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3 text-primary-dark">New Fencing</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">High-quality closeboard, panel, and picket fencing installed to last against the British weather.</p>
                <Link href="/services/fencing" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center gap-1">
                  Learn more &rarr;
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="card group">
              <div className="h-48 relative overflow-hidden bg-gray-200">
                <Image src="https://images.unsplash.com/photo-1628186419747-d5a86dce8f9c?q=80&w=2070&auto=format&fit=crop" alt="Repairs" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3 text-primary-dark">Repairs & Maintenance</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">Storm damage? Rotten posts? We provide rapid repair services to secure your property.</p>
                <Link href="/services/repairs" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center gap-1">
                  Learn more &rarr;
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="card group">
              <div className="h-48 relative overflow-hidden bg-gray-200">
                <Image src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" alt="Landscaping" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3 text-primary-dark">Landscaping</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">Complete garden clearance, turfing, and hard landscaping to create your perfect outdoor space.</p>
                <Link href="/services/landscaping" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center gap-1">
                  Learn more &rarr;
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Link href="/services" className="btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-light rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary-dark rounded-full blur-3xl opacity-50"></div>
        
        <div className="container-max px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready to upgrade your garden?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Get a free, no-obligation quote today. We&apos;re happy to visit your property, discuss your needs, and provide expert advice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="btn-accent py-4 px-8 text-lg">
              Get an Instant Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
