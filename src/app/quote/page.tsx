"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const quoteSchema = z.object({
  serviceType: z.string().min(1, "Please select a service type"),
  length: z.string().optional(),
  extras: z.array(z.string()),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  postcode: z.string().min(5, "Postcode is required"),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const FENCE_TYPES = [
  { id: "closeboard", label: "Closeboard / Featheredge" },
  { id: "panel", label: "Standard Panel Fencing" },
  { id: "picket", label: "Picket Fencing" },
  { id: "other", label: "Other / Not Sure" },
];

const EXTRAS = [
  { id: "gate", label: "Add a Gate" },
  { id: "removal", label: "Remove Old Fence" },
  { id: "concrete-posts", label: "Concrete Posts" },
  { id: "gravel-boards", label: "Gravel Boards" },
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      extras: [],
      serviceType: "",
    },
  });

  const watchServiceType = watch("serviceType");
  const watchExtras = watch("extras");

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would POST to /api/leads
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("Response:", response.status);
      
      // Simulate API call for now if endpoint isn't ready
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit quote request. Please call us instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExtra = (extraId: string) => {
    const currentExtras = watchExtras || [];
    if (currentExtras.includes(extraId)) {
      setValue("extras", currentExtras.filter((id) => id !== extraId));
    } else {
      setValue("extras", [...currentExtras, extraId]);
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="bg-white p-12 rounded-2xl shadow-lg max-w-lg w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-charcoal mb-4">Request Received!</h2>
          <p className="text-gray-600 mb-8">
            Thanks for reaching out. Scott will review your details and get back to you within 24 hours with a ballpark estimate or to arrange a free site survey.
          </p>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container-max px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-charcoal mb-4">Get a Free Estimate</h1>
          <p className="text-gray-600">Answer a few quick questions to help us understand your project.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="flex w-full h-2 bg-gray-100">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              
              {/* STEP 1: Project Details */}
              <div className={step === 1 ? "block" : "hidden"}>
                <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">What type of fencing do you need?</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {FENCE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setValue("serviceType", type.id, { shouldValidate: true })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        watchServiceType === type.id 
                          ? "border-primary bg-primary/5 text-primary-dark font-semibold" 
                          : "border-gray-200 hover:border-primary/50 text-gray-700"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                {errors.serviceType && <p className="text-red-500 text-sm mb-4">{errors.serviceType.message}</p>}

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Approximate Length (in metres or panels) - Optional
                  </label>
                  <input 
                    type="text" 
                    {...register("length")}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="e.g. 15m or 8 panels"
                  />
                </div>

                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={async () => {
                      // Trigger validation for step 1
                      const isValid = await trigger(["serviceType"]);
                      if (isValid) nextStep();
                    }}
                    disabled={!watchServiceType}
                    className="btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* STEP 2: Extras */}
              <div className={step === 2 ? "block" : "hidden"}>
                <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">Any additional requirements?</h2>
                <p className="text-gray-500 mb-6">Select all that apply</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {EXTRAS.map((extra) => {
                    const isSelected = watchExtras?.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                          isSelected 
                            ? "border-primary bg-primary/5 text-primary-dark font-semibold" 
                            : "border-gray-200 hover:border-primary/50 text-gray-700"
                        }`}
                      >
                        {extra.label}
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Details (Optional)
                  </label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    placeholder="Tell us a bit more about the project..."
                  />
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={prevStep} className="btn-outline gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-charcoal">
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                  <button type="button" onClick={nextStep} className="btn-primary gap-2">
                    Next Step <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* STEP 3: Contact Info */}
              <div className={step === 3 ? "block" : "hidden"}>
                <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">Where should we send the estimate?</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      {...register("name")}
                      className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      {...register("phone")}
                      className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="07000 000 000"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      {...register("email")}
                      className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Postcode *</label>
                    <input 
                      type="text" 
                      {...register("postcode")}
                      className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.postcode ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="SM6 0AA"
                    />
                    {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode.message}</p>}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={prevStep} className="btn-outline gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-charcoal" disabled={isSubmitting}>
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                  <button type="submit" className="btn-accent gap-2" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Get My Estimate"}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-6 text-center">
                  By submitting this form, you agree to our privacy policy. We will never spam you.
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
