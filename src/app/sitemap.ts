import { MetadataRoute } from 'next';
import { services } from '@/lib/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abfencing.co.uk';

  // Base routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/gallery',
    '/quote',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic service routes
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...serviceRoutes];
}
