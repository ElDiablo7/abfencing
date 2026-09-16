import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AB Fencing",
  description: "Learn about AB Fencing, a family-run fencing and landscaping business in Wallington with over 20 years of experience.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="bg-primary-dark text-white py-16 mb-16">
        <div className="container-max px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About AB Fencing</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Your local, family-run fencing experts in Wallington.
          </p>
        </div>
      </div>

      <div className="container-max px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Replace with actual team/van photo */}
              <Image 
                src="https://images.unsplash.com/photo-1574359411659-15573a27fd0c?q=80&w=2070&auto=format&fit=crop" 
                alt="AB Fencing Work" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-3xl font-heading font-bold mb-1">20+ Years</p>
                <p className="text-lg opacity-90">of dedicated service</p>
              </div>
            </div>
          </div>
          
          <div>
            <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-6">
              A Family Run Business You Can Trust
            </h2>
            <div className="prose prose-lg text-gray-700 mb-8">
              <p>
                Based in Wallington, AB Fencing has been transforming gardens and securing properties across South London for over two decades. What started as a small operation has grown into a highly trusted local service, completely driven by word-of-mouth recommendations and a commitment to quality.
              </p>
              <p>
                Led by Scott, our team understands that a fence isn&apos;t just a boundary—it&apos;s privacy, security, and a backdrop to your family&apos;s outdoor life. We pride ourselves on honest pricing, turning up when we say we will, and leaving your garden cleaner than we found it.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                "Fully Insured", 
                "Free Written Quotes", 
                "No Hidden Costs", 
                "Premium Materials",
                "Clean Work Sites",
                "Friendly Service"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/quote" className="btn-primary py-4 px-8">
              Get Your Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
