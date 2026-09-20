"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  postcode: z.string().min(5, "Postcode is required"),
  message: z.string().min(10, "Please provide some details about your enquiry"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting:", data);
      // In a real app, POST to /api/leads
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please call us instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="bg-primary-dark text-white py-16 mb-16">
        <div className="container-max px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Get in touch to arrange a free site survey or ask any questions about our services.
          </p>
        </div>
      </div>

      <div className="container-max px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Details & Map */}
          <div>
            <h2 className="text-3xl font-heading font-bold text-charcoal mb-8">Get In Touch</h2>
            
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-charcoal mb-1">Call Scott</h3>
                  <a href="tel:+447539490180" className="text-gray-600 hover:text-primary transition-colors text-lg">07539 490 180</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-charcoal mb-1">Email Us</h3>
                  <a href="mailto:abfencingltd@gmail.com" className="text-gray-600 hover:text-primary transition-colors text-lg">abfencingltd@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-charcoal mb-1">Service Area</h3>
                  <p className="text-gray-600">Wallington, Croydon, Sutton, Banstead, Epsom, Reigate, Dorking, Redhill and surrounding areas in the Southeast.</p>
                  <p className="text-sm text-primary mt-1 font-medium">Contact us to find out more.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-charcoal mb-1">Business Hours</h3>
                  <p className="text-gray-600">Monday - Saturday: 8am - 6pm<br/>Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            {/* Embedded Google Map Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden relative">
              {/* Note: In production, replace with actual Google Maps embed iframe */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium bg-gray-100">
                Map View (Wallington Area)
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
              <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">Send a Message</h2>
              
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg">
                  Thank you for your message! Scott will get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                    <input 
                      type="text" 
                      {...register("name")}
                      className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input 
                      type="tel" 
                      {...register("phone")}
                      className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Your phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input 
                      type="email" 
                      {...register("email")}
                      className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Your email address"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Postcode *</label>
                    <input 
                      type="text" 
                      {...register("postcode")}
                      className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.postcode ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="e.g. SM6 0AA"
                    />
                    {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">How can we help? *</label>
                  <textarea 
                    {...register("message")}
                    rows={5}
                    className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Tell us about the fencing or landscaping work you need..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button type="submit" className="btn-primary py-4 text-lg mt-2" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
