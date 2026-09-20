export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AB Fencing Ltd",
    "image": "https://abfencing.co.uk/logo.png",
    "url": "https://abfencing.co.uk",
    "telephone": "07539490180",
    "email": "abfencingltd@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Wallington",
      "addressRegion": "Surrey",
      "postalCode": "SM6",
      "addressCountry": "UK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.3627,
      "longitude": -0.1416
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/people/AB-Fencing/100069215696600/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
