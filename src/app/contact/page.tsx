"use client";

import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
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
      // 1. Log lead to API in background
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact_form" }),
      }).catch((err) => console.error("Error logging lead:", err));

      // 2. Build WhatsApp deep link message formatted for Scott
      const messageText = `Hi Scott, new website enquiry:\n\n*Name:* ${data.name}\n*Phone:* ${data.phone}\n*Email:* ${data.email}\n*Postcode:* ${data.postcode}\n\n*Enquiry:* ${data.message}`;
      const whatsappUrl = `https://wa.me/447539490180?text=${encodeURIComponent(messageText)}`;

      // 3. Open WhatsApp chat directly
      window.open(whatsappUrl, "_blank");

      setIsSuccess(true);
      reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to open WhatsApp. Please call 07539 490 180 directly.");
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
                  <a href="mailto:info@abfencing.co.uk" className="text-gray-600 hover:text-primary transition-colors text-lg">info@abfencing.co.uk</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-charcoal mb-1">Service Area</h3>
                  <p className="text-gray-600">Wallington, Sutton, Croydon, Carshalton, and surrounding South London areas.</p>
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
            
            {/* Embedded Google Map */}
            <div className="w-full h-72 sm:h-80 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
              <iframe
                title="AB Fencing Service Area - Wallington & Surrounding Areas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19918.423010729355!2d-0.1624647!3d51.3621453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876063eb70a9937%3A0xb3514a60eb2aa4b0!2sWallington!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
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

                <button 
                  type="submit" 
                  className="w-full py-4 text-lg mt-2 font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-300" 
                  disabled={isSubmitting}
                >
                  <MessageCircle className="w-6 h-6 fill-current" />
                  {isSubmitting ? "Opening WhatsApp..." : "Send to Scott's WhatsApp"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
