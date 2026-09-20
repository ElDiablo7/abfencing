import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/lead/WhatsAppButton";
import ChatWidget from "@/components/ai/ChatWidget";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

export const metadata: Metadata = {
  title: "AB Fencing | Professional Fencing & Landscaping in Wallington",
  description: "Family-run fencing and landscaping contractor based in Wallington with over 20 years of experience. We provide high-quality fence installation, repairs, and landscaping services.",
  keywords: ["Fencing", "Landscaping", "Wallington", "Fence Installation", "Fence Repairs", "Sutton", "Croydon", "Garden Fencing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="font-body text-charcoal bg-white antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
